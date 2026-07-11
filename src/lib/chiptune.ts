/**
 * Lightweight looping chiptune / lo-fi bed via Web Audio API.
 * No external audio files required.
 */

type MusicEngine = {
  start: () => Promise<void>;
  stop: () => void;
  setVolume: (v: number) => void;
  isPlaying: () => boolean;
};

const TEMPO = 96; // BPM
const BEAT = 60 / TEMPO;

// A minor pentatonic-ish loop (Hz)
const MELODY = [
  220.0, 261.63, 293.66, 329.63, 392.0, 329.63, 293.66, 261.63,
  246.94, 293.66, 349.23, 392.0, 440.0, 392.0, 349.23, 293.66,
];

const BASS = [110.0, 110.0, 130.81, 130.81, 146.83, 146.83, 164.81, 130.81];

export function createMusicEngine(): MusicEngine {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let timer: number | null = null;
  let step = 0;
  let playing = false;
  let volume = 0.12;

  const ensure = async () => {
    if (!ctx) {
      ctx = new AudioContext();
      master = ctx.createGain();
      master.gain.value = volume;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") await ctx.resume();
    return ctx;
  };

  const tone = (
    frequency: number,
    type: OscillatorType,
    start: number,
    dur: number,
    gainVal: number,
  ) => {
    if (!ctx || !master) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = type;
    osc.frequency.value = frequency;
    filter.type = "lowpass";
    filter.frequency.value = type === "square" ? 1800 : 2400;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(gainVal, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(filter);
    filter.connect(g);
    g.connect(master);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  };

  const tick = () => {
    if (!ctx || !playing) return;
    const t = ctx.currentTime + 0.05;
    const mel = MELODY[step % MELODY.length];
    const bass = BASS[Math.floor(step / 2) % BASS.length];

    // Kick-ish soft thump every 4 steps
    if (step % 4 === 0) {
      tone(55, "sine", t, 0.18, 0.22);
    }
    // Hi-hat click
    if (step % 2 === 1) {
      tone(8000 + Math.random() * 2000, "square", t, 0.03, 0.015);
    }
    // Bass
    tone(bass, "triangle", t, BEAT * 0.85, 0.14);
    // Melody
    tone(mel, "square", t, BEAT * 0.55, 0.07);
    // Soft pad octave
    tone(mel / 2, "sine", t, BEAT * 0.9, 0.04);

    step += 1;
  };

  return {
    async start() {
      await ensure();
      if (playing) return;
      playing = true;
      step = 0;
      tick();
      timer = window.setInterval(tick, BEAT * 1000);
    },
    stop() {
      playing = false;
      if (timer != null) {
        clearInterval(timer);
        timer = null;
      }
      if (master && ctx) {
        master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.05);
        setTimeout(() => {
          if (master && ctx) master.gain.setValueAtTime(volume, ctx.currentTime);
        }, 120);
      }
    },
    setVolume(v: number) {
      volume = Math.max(0, Math.min(1, v));
      if (master && ctx) {
        master.gain.setTargetAtTime(volume, ctx.currentTime, 0.05);
      }
    },
    isPlaying() {
      return playing;
    },
  };
}

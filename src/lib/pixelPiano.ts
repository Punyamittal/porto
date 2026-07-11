/**
 * Pixel-piano click tones — soft sine + triangle stack with piano-ish envelope.
 */

const SCALE = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  349.23, // F4
  392.0, // G4
  440.0, // A4
  523.25, // C5
  587.33, // D5
];

let step = 0;
let lastPlay = 0;

export function playPixelPiano(
  ctx: AudioContext,
  opts?: { chord?: boolean; force?: boolean },
) {
  const now = performance.now();
  if (!opts?.force && now - lastPlay < 45) return;
  lastPlay = now;

  if (ctx.state === "suspended") void ctx.resume();

  const t = ctx.currentTime;
  const freq = SCALE[step % SCALE.length];
  step += 1;

  const master = ctx.createGain();
  master.gain.value = 0.18;
  master.connect(ctx.destination);

  const voice = (frequency: number, type: OscillatorType, gainVal: number, detune = 0) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = type;
    osc.frequency.value = frequency;
    osc.detune.value = detune;
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(3200, t);
    filter.frequency.exponentialRampToValueAtTime(900, t + 0.35);
    // Piano-ish: fast attack, gentle decay
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gainVal, t + 0.012);
    g.gain.exponentialRampToValueAtTime(gainVal * 0.35, t + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
    osc.connect(filter);
    filter.connect(g);
    g.connect(master);
    osc.start(t);
    osc.stop(t + 0.45);
  };

  // Fundamental + soft harmonic (pixel piano character)
  voice(freq, "sine", 0.55);
  voice(freq * 2, "triangle", 0.12, 4);
  voice(freq, "triangle", 0.08, -3);

  // Occasional tiny grace note for "tune" feel
  if (opts?.chord || step % 4 === 0) {
    const grace = SCALE[(step + 2) % SCALE.length];
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = grace;
    g.gain.setValueAtTime(0.0001, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.07);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    osc.connect(g);
    g.connect(master);
    osc.start(t + 0.05);
    osc.stop(t + 0.3);
  }
}

export function resetPianoStep() {
  step = 0;
}

import type { Metadata } from "next";
import { Space_Grotesk, Press_Start_2P, IBM_Plex_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { personJsonLd, SITE_URL, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const ibmPlex = IBM_Plex_Mono({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Punya Mittal | AI Engineer | Full Stack Developer | VIT Chennai",
    template: "%s | Punya Mittal",
  },
  description:
    "Punya Mittal is an AI Engineer, Full Stack Developer, and Computer Science student at VIT Chennai. Explore AI research, open-source projects, blockchain development, and software engineering work.",
  keywords: [
    "Punya Mittal",
    "AI Engineer",
    "VIT Chennai",
    "Full Stack Developer",
    "Machine Learning",
    "Blockchain",
    "React",
    "NextJS",
  ],
  authors: [{ name: "Punya Mittal", url: SITE_URL }],
  creator: "Punya Mittal",
  publisher: "Punya Mittal",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Punya Mittal | AI Engineer | Full Stack Developer | VIT Chennai",
    description:
      "Punya Mittal builds AI systems, full-stack products, and open-source communities from VIT Chennai.",
    url: SITE_URL,
    siteName: "Punya Mittal",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Punya Mittal | AI Engineer | Full Stack Developer | VIT Chennai",
    description:
      "AI Engineer and Full Stack Developer at VIT Chennai — projects, research, and open source.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${pressStart.variable} ${ibmPlex.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href="/samurai.glb" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/draco/draco_wasm_wrapper.js" as="script" />
        <link rel="preload" href="/draco/draco_decoder.wasm" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full font-display antialiased">
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[10002] focus:bg-electric focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

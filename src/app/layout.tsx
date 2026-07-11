import type { Metadata } from "next";
import { Space_Grotesk, Press_Start_2P, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

const ibmPlex = IBM_Plex_Mono({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Punya Mittal — Full-Stack × AI Builder",
  description:
    "VIT CSE student · Founder of Y-SoC · Full Stack Intern @ JBN · AI systems, hackathons, and open-source leadership.",
  keywords: [
    "Punya Mittal",
    "portfolio",
    "VIT",
    "Y-SoC",
    "AI",
    "full stack",
    "hackathon",
    "ANNAM.AI",
  ],
  authors: [{ name: "Punya Mittal" }],
  openGraph: {
    title: "Punya Mittal — Full-Stack × AI Builder",
    description:
      "Building AI systems and communities that ship — from agri-AI to rehab EdTech.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Punya Mittal — Full-Stack × AI Builder",
    description: "VIT · Y-SoC · Hackathons · AI products",
  },
  robots: { index: true, follow: true },
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
      <body className="min-h-full font-display antialiased">
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

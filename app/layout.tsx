import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display, Rajdhani } from "next/font/google";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import { Preloader } from "@/components/Preloader";
import { publicPath } from "@/lib/publicPath";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wargames.command"),
  title: {
    default: "War Games | Cooperative Tactical Operations",
    template: "%s | War Games",
  },
  description:
    "A black ops command terminal for 1-2 player cooperative top-down shooting strategy operations.",
  openGraph: {
    title: "War Games",
    description: "Execute precision strikes. Coordinate fireteams. Control the battlefield from above.",
    type: "website",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "War Games tactical command interface" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "War Games",
    description: "1-2 player cooperative top-down combat.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${inter.variable} ${mono.variable} ${playfair.variable}`}>
      <body>
        <Preloader />
        <div className="site-video-background" aria-hidden="true">
          <video
            className="site-video-background__media"
            src={publicPath("/Canadian Special Forces  CSOR • JTF2.mp4")}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div className="site-shell">
          {children}
          <ConditionalFooter />
        </div>
      </body>
    </html>
  );
}

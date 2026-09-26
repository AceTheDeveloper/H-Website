import type { Metadata, Viewport } from "next";
import { Anybody, Blinker, DotGothic16 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/data";

// Painted-poster headlines. Width axis lets us run it condensed.
const display = Anybody({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["wdth"],
  display: "swap",
});

const blinker = Blinker({
  subsets: ["latin"],
  variable: "--font-blinker",
  weight: ["400", "600"],
  display: "swap",
});

// Dot-matrix lettering, used only inside the LED signboard.
const led = DotGothic16({
  subsets: ["latin"],
  variable: "--font-led",
  weight: "400",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#E21E02",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "H Breakfast to Bar | Restaurant & Bar in Iloilo City",
    template: "%s | H Breakfast to Bar",
  },
  description:
    "All-day restaurant and bar on Diversion Road, Mandurriao, Iloilo City. Breakfast and coffee from 6 AM, plates to share, and cocktails until late.",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_PH",
    url: "/",
    title: "H Breakfast to Bar | Restaurant & Bar in Iloilo City",
    description:
      "From first coffee to last call. Breakfast, plates to share, and a full bar in Mandurriao, Iloilo City.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-PH">
      <body
        className={`${display.variable} ${blinker.variable} ${led.variable} font-body antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd />
        <Analytics />
      </body>
    </html>
  );
}

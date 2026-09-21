import type { Metadata } from "next";
import { Blinker } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blinker = Blinker({
  subsets: ["latin"],
  variable: "--font-blinker",
  weight: ["100", "200", "300", "400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  // Change this to the custom domain once the client has one
  metadataBase: new URL("https://hbreakfasttobar.vercel.app"),
  title: {
    default:
      "H Breakfast to Bar | All-Day Restaurant & Bar in Mandurriao, Iloilo City",
    template: "%s | H Breakfast to Bar",
  },
  description:
    "All-day restaurant and bar on Diversion Road, Mandurriao, Iloilo City. Breakfast and coffee from 7 AM, plates to share, and cocktails until late.",
  openGraph: {
    siteName: "H Breakfast to Bar",
    type: "website",
    locale: "en_PH",
    title: "H Breakfast to Bar | All-Day Restaurant & Bar in Iloilo City",
    description:
      "From first coffee to last call. Breakfast, plates to share, and a full bar in Mandurriao, Iloilo City.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${blinker.variable} font-body antialiased`}>
        <noscript>
          <style>
            {".reveal{opacity:1!important;transform:none!important}"}
          </style>
        </noscript>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

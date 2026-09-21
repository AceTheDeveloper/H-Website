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
  title: "H Breakfast to Bar",
  description:
    "Morning coffee, all-day plates and late bar hours, all under one roof — H Breakfast to Bar.",
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

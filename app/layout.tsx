import type { Metadata } from "next";
import { Big_Shoulders_Display, Martian_Mono, Cormorant_Garamond } from "next/font/google";
import Nav from "@/components/layout/Nav";
import "./globals.css";

const displayFont = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-display",
  display: "swap",
});

const monoFont = Martian_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jonathan — Developer & Human",
  description:
    "Portfolio of Jonathan. I build for mobile and web. I think in systems but design for humans.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${monoFont.variable} ${serifFont.variable}`}
      >
        <Nav />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

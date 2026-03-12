import type { Metadata } from "next";
import { Big_Shoulders_Display, Martian_Mono, Cormorant_Garamond } from "next/font/google";
import GrainOverlay from "@/components/shared/GrainOverlay";
import "./globals.css";

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-big-shoulders",
  display: "swap",
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-martian-mono",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jonathan — Developer & Human",
  description:
    "Portfolio of Jonathan. Developer, car enthusiast, and atmosphere collector.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bigShoulders.variable} ${martianMono.variable} ${cormorant.variable} font-mono antialiased`}
      >
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WEVINE | Wallcoverings",
    template: "%s | WEVINE",
  },

  description:
    "Refined natural wallcoverings crafted from woven fibers, grasscloth, raffia and natural textures for residential, hospitality and commercial interiors.",

  keywords: [
    "wallcovering",
    "wallcoverings",
    "natural wallcovering",
    "woven wallcovering",
    "luxury wallcovering",
    "grasscloth",
    "raffia wallcovering",
    "interior design",
    "hospitality design",
    "commercial interiors",
    "luxury interiors",
    "WEVINE",
  ],

  authors: [{ name: "WEVINE" }],
  creator: "WEVINE",
  publisher: "WEVINE",

  metadataBase: new URL("https://www.wevinewallcoverings.com"),

  openGraph: {
    title: "WEVINE | Wallcoverings",
    description:
      "Refined natural wallcoverings crafted for timeless interiors.",
    url: "https://www.wevinewallcoverings.com",
    siteName: "WEVINE",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "WEVINE | Wallcoverings",
    description:
      "Refined natural wallcoverings crafted for timeless interiors.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

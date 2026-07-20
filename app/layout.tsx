import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.wevinewallcoverings.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "WEVINE | Natural Woven Wallcoverings",
    template: "%s | WEVINE",
  },

  description:
    "Discover refined natural woven wallcoverings crafted from woven fibres, grasscloth, raffia and organic textures for residential, hospitality and commercial interiors.",

  keywords: [
    "natural wallcoverings",
    "woven wallcoverings",
    "luxury wallcoverings",
    "grasscloth wallcoverings",
    "raffia wallcoverings",
    "natural fibre wallcoverings",
    "textured wallcoverings",
    "designer wallcoverings",
    "hospitality wallcoverings",
    "commercial wallcoverings",
    "residential wallcoverings",
    "interior wall finishes",
    "WEVINE wallcoverings",
  ],

  authors: [{ name: "WEVINE", url: siteUrl }],
  creator: "WEVINE",
  publisher: "WEVINE",

  category: "Interior Design",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "WEVINE | Natural Woven Wallcoverings",
    description:
      "Refined natural woven wallcoverings created for residential, hospitality and commercial interiors.",
    url: siteUrl,
    siteName: "WEVINE",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "WEVINE natural woven wallcoverings",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "WEVINE | Natural Woven Wallcoverings",
    description:
      "Refined natural woven wallcoverings created for timeless interiors.",
    images: ["/twitter-image.jpg"],
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
      <body className="flex min-h-full flex-col">
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PRX14Q8NPR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              window.dataLayer.push(arguments);
            }

            gtag("js", new Date());
            gtag("config", "G-PRX14Q8NPR", {
              anonymize_ip: true
            });
          `}
        </Script>
      </body>
    </html>
  );
}
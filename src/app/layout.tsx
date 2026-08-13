import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { buildHomeMetadata, websiteJsonLd, organizationJsonLd, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { CookieBanner } from "@/components/site/cookie-banner";
import { GoogleAnalytics } from "@/components/site/google-analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...buildHomeMetadata(),
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
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
      lang="ro"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={organizationJsonLd()} />
      </head>
      <body className="min-h-full flex flex-col bg-paper w-full">
        <GoogleAnalytics />
        {children}
        <CookieBanner />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

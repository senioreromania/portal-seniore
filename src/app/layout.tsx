import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { buildHomeMetadata, websiteJsonLd, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { CookieBanner } from "@/components/site/cookie-banner";
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
    icon: "/logo-seniore.png",
    apple: "/logo-seniore.png",
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
      </head>
      <body className="min-h-full flex flex-col bg-paper w-full">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6LQ7HMECW2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6LQ7HMECW2');
          `}
        </Script>
        {children}
        <CookieBanner />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

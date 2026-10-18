import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Header from "./header/page";
import Footer from "./fotter/page";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shopprofiles.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "ShopProfile — Create Your Digital Shop Profile",
    template: "%s | ShopProfile",
  },

  description:
    "Create your digital shop profile, showcase products, share your business and connect with customers using one simple link or QR code.",

  keywords: [
    "ShopProfile",
    "Digital Shop Profile",
    "Online Shop Catalog",
    "QR Code Menu",
    "Shop Website Maker",
    "Digital Storefront",
    "Small Business Website",
    "Product Showcase",
  ],

  authors: [{ name: "ShopProfile Team" }],
  creator: "ShopProfile",
  publisher: "ShopProfile",

  alternates: {
    canonical: "./",
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

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "ShopProfile",
    title: "ShopProfile — Create Your Digital Shop Profile",
    description:
      "Create your digital shop profile, showcase products, share your business and connect with customers using one simple link or QR code.",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "ShopProfile Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ShopProfile — Create Your Digital Shop Profile",
    description:
      "Create your digital shop profile, showcase products, share your business and connect with customers using one simple link or QR code.",
    images: ["/images/hero.png"],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ShopProfile",
    url: siteUrl,
    description:
      "Create your digital shop profile, showcase products, share your business and connect with customers using one simple link or QR code.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-white font-sans text-slate-900 antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

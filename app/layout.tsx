import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./header/page";
import Footer from "./fotter/page";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shopprofile.in"),

  title: {
    default: "ShopProfile — Create Your Digital Shop Profile",
    template: "%s | ShopProfile",
  },

  description:
    "Create your digital shop profile, showcase products, share your business and connect with customers using one simple link or QR code.",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-white font-sans text-slate-900 antialiased`}
      >

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

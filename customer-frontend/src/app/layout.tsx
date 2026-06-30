import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "../features/navigation/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maison Culinaire | Gastronomy Atelier",
    template: "%s | Maison Culinaire",
  },
  description: "Experience premium, hand-crafted culinary artistry. From seared A5 Wagyu beef to truffle mushroom risottos, discover a sensory journey at Maison Culinaire.",
  keywords: ["luxury dining", "fine dining", "gourmet restaurant", "A5 Wagyu", "truffle menu", "culinary atelier"],
  authors: [{ name: "Maison Culinaire Atelier" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Maison Culinaire | Gastronomy Atelier",
    description: "Indulge in a premium dining experience at Maison Culinaire where gastronomy meets cinematic art.",
    siteName: "Maison Culinaire",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maison Culinaire Culinary Atelier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Culinaire | Gastronomy Atelier",
    description: "Indulge in a premium dining experience at Maison Culinaire where gastronomy meets cinematic art.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground scroll-smooth select-none">
        <Providers>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

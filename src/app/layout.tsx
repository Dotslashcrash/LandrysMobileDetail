import type { Metadata, Viewport } from "next";
import { Header, Footer } from "@/components/shell";
import { siteUrl } from "@/lib/seo";
import { contact } from "@/data/business";
import { CinematicMotion } from "@/components/cinematic-motion";
import "./globals.css";
import "./cinematic.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Landry’s Mobile Detail | Northwest Arkansas & River Valley",
    template: "%s | Landry’s Mobile Detail",
  },
  description:
    "Mobile detailing at your home or workplace in Northwest Arkansas and the Arkansas River Valley. Interior, exterior, paint care, and protection inquiries.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg", apple: "/brand/apple-touch-icon.png" },
  robots: {
    index: process.env.ALLOW_INDEXING === "true",
    follow: process.env.ALLOW_INDEXING === "true",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Landry’s Mobile Detail",
    title: "Landry’s Mobile Detail",
    description:
      "Mobile detailing at your home or workplace in Northwest Arkansas and the River Valley.",
  },
  twitter: {
    card: "summary",
    title: "Landry’s Mobile Detail",
    description: "Mobile detailing in Northwest Arkansas and the River Valley.",
  },
};
export const viewport: Viewport = { themeColor: "#053065" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: "Landry’s Mobile Detail",
    logo: `${siteUrl}/brand/logo-family.webp`,
    url: siteUrl,
    email: contact.email,
    areaServed: ["Northwest Arkansas", "Arkansas River Valley"],
    description:
      "Mobile automotive detailing in Northwest Arkansas and the Arkansas River Valley.",
  };
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          href="/fonts/saira-condensed-bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/telegraf-regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <CinematicMotion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Header, Footer } from "@/components/shell";
import { siteUrl } from "@/lib/seo";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Landry’s Mobile Detail | Northwest Arkansas & River Valley",
    template: "%s | Landry’s Mobile Detail",
  },
  description:
    "Professional mobile automotive detailing in Northwest Arkansas and the Arkansas River Valley. Your car. Your driveway. Our standard.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
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
    description: "Your car. Your driveway. Our standard.",
  },
  twitter: {
    card: "summary",
    title: "Landry’s Mobile Detail",
    description: "Mobile detailing in Northwest Arkansas and the River Valley.",
  },
};
export const viewport: Viewport = { themeColor: "#101211" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: "Landry’s Mobile Detail",
    url: siteUrl,
    areaServed: ["Northwest Arkansas", "Arkansas River Valley"],
    description:
      "Mobile automotive detailing in Northwest Arkansas and the Arkansas River Valley.",
  };
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
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

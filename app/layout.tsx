import type { Metadata } from "next";
import { Oswald, Anton, Playfair_Display } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Hornaman Chiropractic Center",
  image: "https://hornamanchiropracticcenter.com/images/hero_billboard.jpg",
  url: "https://hornamanchiropracticcenter.com",
  telephone: "+18144387242",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "107 N. Main St.",
    addressLocality: "Union City",
    addressRegion: "PA",
    postalCode: "16438",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "08:30", closes: "16:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:30", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:30", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:30", closes: "16:00" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    reviewCount: "14",
  },
};

const siteUrl = "https://hornamanchiropracticcenter.com";

export const metadata: Metadata = {
  title: "Hornaman Chiropractic Center | Union City, PA Chiropractor",
  description:
    "Dr. Thomas Hornaman offers expert chiropractic care in Union City, PA. Treating back pain, neck pain, sciatica, auto injuries & more. Accepting new patients. Call (814) 438-7242.",
  keywords: [
    "chiropractor union city pa",
    "chiropractor erie county pa",
    "back pain relief",
    "neck pain",
    "sciatica treatment",
    "auto injury chiropractor",
    "sports injury chiropractor near me",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Hornaman Chiropractic Center",
    title: "Hornaman Chiropractic Center | Union City, PA Chiropractor",
    description:
      "Dr. Thomas Hornaman offers expert chiropractic care in Union City, PA. Treating back pain, neck pain, sciatica, auto injuries & more. Accepting new patients.",
    images: [
      {
        url: "/images/hero_billboard.jpg",
        width: 1200,
        height: 630,
        alt: "Hornaman Chiropractic Center — Got Pain? Think Chiropractic.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hornaman Chiropractic Center | Union City, PA Chiropractor",
    description:
      "Expert chiropractic care in Union City, PA. Back pain, neck pain, sciatica, auto injuries. Accepting new patients — call (814) 438-7242.",
    images: ["/images/hero_billboard.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${anton.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-800">
        {children}
      </body>
    </html>
  );
}

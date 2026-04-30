import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MedicalBusiness"],
  name: "Hornaman Chiropractic Center",
  description:
    "Compassionate chiropractic care for the whole family in Union City, Pennsylvania.",
  url: "https://hornamanchiropracticcenter.com",
  telephone: "+18144387242",
  priceRange: "$$",
  employee: {
    "@type": "Person",
    name: "Dr. Thomas J. Hornaman",
    jobTitle: "Doctor of Chiropractic",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "107 N. Main St.",
    addressLocality: "Union City",
    addressRegion: "PA",
    postalCode: "16438",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
};

export const metadata: Metadata = {
  title: "Hornaman Chiropractic Center | Union City, PA",
  description:
    "Compassionate chiropractic care for the whole family in Union City, Pennsylvania. Accepting new patients — call (814) 438-7242 to book.",
  keywords: [
    "chiropractor",
    "chiropractic",
    "Union City PA",
    "back pain",
    "neck pain",
    "spinal adjustment",
    "Erie County chiropractor",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={oswald.variable}>
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

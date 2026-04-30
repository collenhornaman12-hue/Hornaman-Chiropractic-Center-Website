import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

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
      <body className="font-sans antialiased bg-white text-gray-800">
        {children}
      </body>
    </html>
  );
}

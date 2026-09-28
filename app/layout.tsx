import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Space_Mono, DM_Sans, Source_Serif_4 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Rhea Acharya",
  description: "Personal portfolio of Rhea Acharya",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${spaceMono.variable} ${dmSans.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto w-full md:px-8 pt-4 pb-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

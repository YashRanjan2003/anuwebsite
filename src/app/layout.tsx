import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google"; // Changed fonts
import "./globals.css";
import Navigation from "@/components/Navigation"; // Added Navigation

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creator Store",
  description: "A Gen Z Hype Art Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased bg-brand-dark text-white`}
      >
        <main className="min-h-screen">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
}

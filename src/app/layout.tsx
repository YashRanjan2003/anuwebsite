'use client';
import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import { Playfair_Display, Lato, Caveat } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' });

// Metadata needs to be in a separate server component or layout_metadata.ts but for now we remove it from here since this is client side.
// Ideally layout.tsx should be server, and wrapping provider client.
// Quick fix: Move metadata to page.tsx or keep layout server and make a wrapper.
// Strategy: Keep layout.tsx client for now as per previous edits, removing config.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavigation = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable} ${caveat.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider>
          <CartProvider>
            {children}
            {!hideNavigation && <Navigation />}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Playfair_Display, Lato, Caveat } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' });

export const metadata: Metadata = {
  title: 'Artist Journal',
  description: 'A curated collection of art.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable} ${caveat.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider>
          <CartProvider>
            <main className="min-h-screen">
              {children}
            </main>
            <Navigation />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

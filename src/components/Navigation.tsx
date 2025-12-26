'use client';

import { Home, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-journal-paper/95 border-t border-journal-secondary/20 p-4 md:hidden z-50 flex justify-around items-center backdrop-blur-md pb-6 safe-area-bottom shadow-up">
        <Link href="/" className="text-journal-secondary hover:text-journal-accent transition-colors">
          <Home size={24} strokeWidth={1.5} />
        </Link>
        <Link href="/cart" className="text-journal-secondary hover:text-journal-accent transition-colors relative">
          <ShoppingBag size={24} strokeWidth={1.5} />
          {/* Badge could go here */}
        </Link>
        <Link href="/profile" className="text-journal-secondary hover:text-journal-accent transition-colors">
          <User size={24} strokeWidth={1.5} />
        </Link>
        <button onClick={() => setIsMenuOpen(true)} className="text-journal-secondary hover:text-journal-accent transition-colors">
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Desktop Top Nav */}
      <nav className="hidden md:flex fixed top-0 right-0 p-8 z-50">
        <button onClick={() => setIsMenuOpen(true)} className="text-journal-secondary hover:text-journal-accent transition-colors cursor-pointer bg-journal-paper/50 p-2 rounded-full border border-journal-secondary/10">
          <Menu size={32} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-journal-paper/98 z-[60] flex flex-col items-center justify-center border-8 border-background overflow-hidden"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-journal-secondary hover:text-journal-accent hover:rotate-90 transition-all cursor-pointer">
              <X size={48} strokeWidth={1} />
            </button>
            <div className="flex flex-col gap-6 text-center">
              {['Home', 'Profile', 'Cart'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-5xl md:text-7xl font-serif italic text-journal-secondary hover:text-journal-accent transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

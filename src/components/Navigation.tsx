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
      <nav className="fixed bottom-0 left-0 right-0 bg-brand-dark/90 border-t border-white/10 p-4 md:hidden z-50 flex justify-around items-center backdrop-blur-md pb-6 safe-area-bottom">
        <Link href="/" className="text-white hover:text-brand-neon transition-colors">
          <Home size={24} />
        </Link>
        <Link href="/shop" className="text-white hover:text-brand-neon transition-colors">
          <ShoppingBag size={24} />
        </Link>
         <Link href="/profile" className="text-white hover:text-brand-neon transition-colors">
          <User size={24} />
        </Link>
        <button onClick={() => setIsMenuOpen(true)} className="text-white hover:text-brand-neon transition-colors">
          <Menu size={24} />
        </button>
      </nav>

      {/* Desktop Top Nav (Burger only) */}
      <nav className="hidden md:flex fixed top-0 right-0 p-8 z-50 mix-blend-difference">
         <button onClick={() => setIsMenuOpen(true)} className="text-white hover:text-brand-neon transition-colors cursor-pointer">
          <Menu size={40} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-neon z-[60] flex flex-col items-center justify-center"
          >
             <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-brand-dark hover:scale-110 transition-transform cursor-pointer">
              <X size={48} strokeWidth={1.5} />
            </button>
            <div className="flex flex-col gap-4 text-center">
              {['Home', 'Shop', 'Collections', 'About', 'Contact'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-6xl md:text-8xl font-black text-brand-dark uppercase tracking-tighter hover:text-white transition-colors"
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

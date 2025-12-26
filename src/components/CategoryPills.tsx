'use client';
import { motion } from 'framer-motion';

const categories = ['All', 'Christmas Cards', 'Canvas', 'Digital', 'Sketches'];

export default function CategoryPills({ activeCategory, onCategoryChange }: { activeCategory: string, onCategoryChange: (cat: string) => void }) {
    return (
        <div className="sticky top-0 z-40 bg-brand-dark/80 backdrop-blur-lg border-b border-white/5 py-4 pl-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-3 pr-4 w-max">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={`
              px-6 py-2 rounded-full font-mono text-sm uppercase tracking-wider transition-all border whitespace-nowrap
              ${activeCategory === cat
                                ? 'bg-brand-neon text-brand-dark border-brand-neon font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                                : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:bg-white/10 backdrop-blur-md'
                            }
            `}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}

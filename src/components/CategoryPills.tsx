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
              px-6 py-2 rounded-full font-sans text-sm uppercase tracking-wider transition-all border whitespace-nowrap
              ${activeCategory === cat
                                ? 'bg-journal-accent text-white border-journal-accent font-bold shadow-md'
                                : 'bg-white/50 text-journal-secondary border-journal-secondary/20 hover:border-journal-accent/50 hover:bg-white hover:text-journal-accent'
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

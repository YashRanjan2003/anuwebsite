'use client';
import { motion } from 'framer-motion';
import { useArtworks } from '@/hooks/useArtworks';

export default function ArtFeed({ selectedCategory, onProductSelect }: { selectedCategory: string, onProductSelect: (p: any) => void }) {
    const { artworks, loading, error } = useArtworks(selectedCategory);

    if (loading) {
        return (
            <div className="p-8 text-center text-white/50 animate-pulse font-mono">
                LOADING ARTWORKS...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center text-red-500 font-mono">
                ERROR LOADING FEED: {error}
            </div>
        );
    }

    if (artworks.length === 0) {
        return (
            <div className="p-8 text-center text-white/50 font-mono">
                NO ARTWORKS FOUND.
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 min-h-screen">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {artworks.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: (index % 5) * 0.1,
                            ease: "easeOut"
                        }}
                        viewport={{ once: true, margin: "-50px" }}
                        onClick={() => onProductSelect(item)}
                        className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#252525]"
                    >
                        {/* Image Placeholder using Cloud URL or Fallback */}
                        <div className={`w-full bg-neutral-800 ${index % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'} flex items-center justify-center relative`}>
                            {item.imageUrl && (
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            )}
                            {!item.imageUrl && <span className="text-white/20 font-mono text-sm">{item.title}</span>}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                            <p className="text-brand-neon font-mono text-xs mb-1">{item.category}</p>
                            <h3 className="text-white font-bold text-xl uppercase">{item.title}</h3>
                            <p className="text-white font-mono mt-2">${item.price}</p>
                            {item.status === 'sold' && (
                                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SOLD</span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

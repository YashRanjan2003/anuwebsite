'use client';
import { motion } from 'framer-motion';
import { useArtworks } from '@/hooks/useArtworks';

export default function ArtFeed({ selectedCategory, onProductSelect }: { selectedCategory: string, onProductSelect: (p: any) => void }) {
    const { artworks, loading, error } = useArtworks(selectedCategory);

    if (loading) {
        return (
            <div className="p-8 text-center text-journal-secondary/50 animate-pulse font-serif italic text-xl">
                Preparing the gallery...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center text-red-500 font-sans">
                Error loading gallery: {error}
            </div>
        );
    }

    if (artworks.length === 0) {
        return (
            <div className="p-8 text-center text-journal-secondary/50 font-serif italic">
                No pieces found in this collection.
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 min-h-screen">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {artworks.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: (index % 5) * 0.1,
                            ease: "easeOut"
                        }}
                        viewport={{ once: true, margin: "-50px" }}
                        onClick={() => onProductSelect(item)}
                        className="break-inside-avoid relative group cursor-pointer"
                    >
                        {/* Artwork Frame */}
                        <div className={`w-full bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-500 border border-journal-paper`}>
                            <div className={`w-full bg-gray-100 ${index % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'} overflow-hidden relative`}>
                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-journal-secondary/20 font-serif italic">
                                        {item.title}
                                    </div>
                                )}

                                {item.status === 'sold' && (
                                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] flex items-center justify-center">
                                        <span className="bg-white/90 text-journal-accent font-serif italic text-xl px-4 py-2 border border-journal-accent/20">Sold</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 text-center">
                                <h3 className="font-serif italic text-2xl text-foreground">{item.title}</h3>
                                <p className="font-sans text-sm text-journal-secondary uppercase tracking-widest mt-1">{item.category}</p>
                                <p className="font-serif text-lg text-journal-accent mt-2">₹{item.price}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

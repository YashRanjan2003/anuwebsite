'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import { Artwork } from '@/hooks/useArtworks';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function ProductDrawer({ product, onClose }: { product: Artwork | null, onClose: () => void }) {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            onClose();
            // Optional: User feedback or redirect
            // alert('Added to journal collection!');
        }
    };

    return (
        <AnimatePresence>
            {product && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-journal-secondary/20 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-[70] bg-background rounded-t-3xl border-t border-journal-secondary/20 p-6 md:p-8 max-h-[85vh] overflow-y-auto shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="text-journal-secondary font-bold text-xs uppercase tracking-widest">{product.category}</span>
                                <h2 className="text-4xl md:text-5xl font-serif italic text-journal-accent mt-1 leading-none">{product.title}</h2>
                            </div>
                            <button onClick={onClose} className="p-2 bg-journal-paper/50 rounded-full hover:bg-journal-paper/80 text-journal-secondary transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Image */}
                            <div className="w-full md:w-1/2 aspect-square bg-white rounded-xl flex items-center justify-center border border-journal-paper shadow-sm overflow-hidden">
                                {product.imageUrl ? (
                                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-journal-secondary/40 font-serif italic text-xl">{product.title} Image</span>
                                )}
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <p className="text-3xl font-serif text-foreground mb-4">${product.price}</p>
                                    <p className="text-journal-secondary leading-relaxed max-w-md font-sans">{product.artistNote || "No artist note available."}</p>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.status === 'sold'}
                                    className="w-full mt-8 md:mt-0 py-4 bg-journal-accent text-white rounded-sm font-serif italic text-xl hover:bg-journal-secondary transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ShoppingCart size={20} />
                                    {product.status === 'sold' ? 'Sold Out' : 'Add to Collection'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

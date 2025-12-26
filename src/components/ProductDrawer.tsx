'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';

interface Product {
    id: number;
    title: string;
    category: string;
    price: string;
    description: string;
    image: string; // Placeholder string
}

export default function ProductDrawer({ product, onClose }: { product: Product | null, onClose: () => void }) {
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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-[70] bg-[#1e1e1e] rounded-t-3xl border-t border-white/10 p-6 md:p-8 max-h-[85vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="text-brand-neon font-mono text-xs uppercase tracking-widest">{product.category}</span>
                                <h2 className="text-3xl md:text-5xl font-black text-white mt-1 uppercase leading-none">{product.title}</h2>
                            </div>
                            <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Image Placeholder */}
                            <div className="w-full md:w-1/2 aspect-square bg-neutral-800 rounded-xl flex items-center justify-center border border-white/5">
                                <span className="text-white/20 font-bold">{product.title} Image</span>
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <p className="text-3xl font-mono text-brand-neon mb-4">{product.price}</p>
                                    <p className="text-gray-400 leading-relaxed max-w-md">{product.description}</p>
                                </div>

                                <button className="w-full mt-8 md:mt-0 py-4 bg-white text-brand-dark rounded-xl font-bold uppercase hover:bg-brand-neon transition-colors flex items-center justify-center gap-2">
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

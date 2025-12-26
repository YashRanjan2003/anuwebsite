'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, total } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center bg-background text-foreground animate-fade-in-up">
                <h1 className="font-serif text-5xl italic text-journal-accent mb-4">Your Satchel is Empty</h1>
                <p className="font-hand text-2xl text-journal-secondary mb-8">Go forth and find inspiration...</p>
                <Link
                    href="/"
                    className="bg-journal-secondary text-white font-serif italic px-8 py-3 hover:bg-journal-accent transition-colors"
                >
                    Return to Gallery
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-background text-foreground">
            <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up">

                <h1 className="font-serif text-5xl italic text-journal-accent border-b-2 border-journal-accent/20 pb-6">Your Collection</h1>

                <div className="space-y-8">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-6 items-center bg-white p-4 shadow-sm border border-journal-paper/50">
                            <div className="w-24 h-24 bg-gray-100 overflow-hidden relative">
                                {/* Assuming item.imageUrl exists, otherwise placeholder */}
                                <img src={item.imageUrl} alt={item.title} className="object-cover w-full h-full" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-serif text-xl text-foreground">{item.title}</h3>
                                <p className="font-sans text-sm text-journal-secondary">{item.category}</p>

                                <div className="flex items-center gap-4 mt-4">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-journal-secondary/30 hover:bg-journal-paper transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="font-serif text-lg w-4 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-journal-secondary/30 hover:bg-journal-paper transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="font-serif text-xl">${item.price * item.quantity}</p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-journal-secondary hover:text-red-600 mt-2 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-end gap-4 border-t-2 border-journal-accent/20 pt-8">
                    <div className="flex justify-between w-full max-w-sm text-2xl font-serif">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                    <Link
                        href="/checkout"
                        className="flex items-center gap-2 bg-journal-accent text-white font-serif italic text-xl px-12 py-4 hover:bg-journal-secondary transition-colors"
                    >
                        Proceed to Acquire <ArrowRight size={20} />
                    </Link>
                </div>

            </div>
        </div>
    );
}

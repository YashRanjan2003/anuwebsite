'use client';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cart, total, clearCart } = useCart();
    const [address, setAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Redirect if empty cart
    useEffect(() => {
        if (cart.length === 0) router.push('/cart');
    }, [cart, router]);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                // ideally redirect to login with callback, but for now just login
                router.push('/login');
                return;
            }

            // 1. Create Order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: user.id,
                    total_amount: total,
                    shipping_address: address,
                    status: 'paid' // Automatically paid in this mock flow
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Create Order Items
            const orderItems = cart.map(item => ({
                order_id: order.id,
                artwork_id: item.id,
                price_at_purchase: item.price
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // 3. Mark Artworks as Sold (Optional logic, requested by user? "status" exists)
            // For now, let's NOT automatically mark as sold unless it's a unique piece.
            // Assuming 1:1 unique art:
            for (const item of cart) {
                await supabase.from('artworks').update({ status: 'sold' }).eq('id', item.id);
            }

            clearCart();
            router.push('/profile');
            alert('Order placed successfully! Thank you for collecting.');

        } catch (err: any) {
            console.error(err);
            alert('Checkout failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-background text-foreground flex justify-center">
            <div className="w-full max-w-lg space-y-8 animate-fade-in-up">

                <h1 className="font-serif text-4xl italic text-journal-accent text-center">Secure Checkout</h1>
                <p className="text-center font-sans text-journal-secondary">Total Due: <span className="font-bold text-foreground">${total}</span></p>

                <form onSubmit={handleCheckout} className="bg-white p-8 shadow-sm border border-journal-paper/50 space-y-6">

                    <div className="space-y-2">
                        <label className="block text-sm font-bold tracking-widest uppercase text-journal-secondary">Shipping Address</label>
                        <textarea
                            required
                            rows={3}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full bg-journal-paper/20 border-b-2 border-journal-secondary/20 p-3 focus:outline-none focus:border-journal-accent transition-colors font-serif text-lg"
                            placeholder="123 Gallery Lane..."
                        />
                    </div>

                    <div className="space-y-4 border-t border-dashed border-gray-200 pt-4">
                        <h3 className="font-hand text-xl text-journal-secondary">Payment Details (Mock)</h3>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold tracking-widest uppercase text-journal-secondary">Card Number</label>
                            <input
                                required
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full bg-journal-paper/20 border-b-2 border-journal-secondary/20 p-3 focus:outline-none focus:border-journal-accent transition-colors font-mono text-lg"
                                placeholder="0000 0000 0000 0000"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                required
                                type="text"
                                className="w-full bg-journal-paper/20 border-b-2 border-journal-secondary/20 p-3 focus:outline-none focus:border-journal-accent transition-colors font-mono text-lg"
                                placeholder="MM/YY"
                            />
                            <input
                                required
                                type="text"
                                className="w-full bg-journal-paper/20 border-b-2 border-journal-secondary/20 p-3 focus:outline-none focus:border-journal-accent transition-colors font-mono text-lg"
                                placeholder="CVC"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-journal-secondary text-white font-serif italic text-xl py-4 hover:bg-journal-accent transition-colors disabled:opacity-50 mt-8"
                    >
                        {loading ? 'Processing...' : `Pay $${total}`}
                    </button>

                </form>

            </div>
        </div>
    );
}

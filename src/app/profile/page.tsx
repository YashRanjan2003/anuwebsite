'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            setUser(user);

            // Fetch Profile
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            setProfile(profileData);

            // Fetch Orders
            const { data: ordersData } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            setOrders(ordersData || []);

            setLoading(false);
        };

        fetchData();
    }, [router]);

    if (loading) return <div className="min-h-screen pt-32 flex justify-center text-journal-secondary font-hand text-2xl">Loading your journal...</div>;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-background text-foreground">
            <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up">

                {/* Header */}
                <div className="flex justify-between items-end border-b-2 border-journal-accent/20 pb-6">
                    <div>
                        <h1 className="font-serif text-5xl italic text-journal-accent mb-2">My Journal</h1>
                        <p className="font-sans text-journal-secondary">Welcome back, {profile?.full_name || user?.email}</p>
                    </div>
                    <button
                        onClick={() => supabase.auth.signOut().then(() => router.push('/'))}
                        className="text-sm font-bold uppercase tracking-widest text-journal-secondary hover:text-journal-accent transition-colors"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Orders Section */}
                <div className="space-y-6">
                    <h2 className="font-hand text-3xl text-journal-secondary">Collection History</h2>

                    {orders.length === 0 ? (
                        <div className="bg-white p-8 text-center border border-dashed border-journal-secondary/30 rounded-sm">
                            <p className="font-serif text-xl text-gray-400 italic mb-4">Your collection is empty.</p>
                            <button
                                onClick={() => router.push('/')}
                                className="bg-journal-accent text-white font-serif italic px-8 py-3 hover:bg-journal-secondary transition-colors"
                            >
                                Explore Artworks
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white p-6 border border-journal-paper/50 shadow-sm flex justify-between items-center">
                                    <div>
                                        <p className="font-mono text-xs text-journal-secondary mb-1">ORDER #{order.id.slice(0, 8)}</p>
                                        <p className="font-serif text-lg">{new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-serif text-2xl text-journal-accent">${order.total_amount}</p>
                                        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${order.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

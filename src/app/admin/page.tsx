'use client';
import { supabase } from '@/lib/supabase';
import { useArtworks } from '@/hooks/useArtworks';
import { Pencil, Trash, Plus, Package, Grid } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const { artworks, loading: loadingArtworks } = useArtworks();
    const [orders, setOrders] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');
    const [loadingOrders, setLoadingOrders] = useState(false);

    useEffect(() => {
        if (activeTab === 'orders') fetchOrders();
    }, [activeTab]);

    const fetchOrders = async () => {
        setLoadingOrders(true);
        const { data } = await supabase
            .from('orders')
            .select('*, profiles(full_name, address)') // Join with profiles if RLS allows
            .order('created_at', { ascending: false });
        setOrders(data || []);
        setLoadingOrders(false);
    };

    const updateOrderStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', id);
        if (!error) fetchOrders();
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'available' ? 'sold' : 'available';
        const { error } = await supabase.from('artworks').update({ status: newStatus }).eq('id', id);
        if (error) alert('Error updating status');
    };

    const deleteArtwork = async (id: string) => {
        if (confirm('Delete this artwork?')) {
            const { error } = await supabase.from('artworks').delete().eq('id', id);
            if (error) alert('Error deleting artwork');
        }
    };

    if (loadingArtworks && activeTab === 'inventory') return <div className="text-journal-secondary font-serif italic text-2xl animate-pulse">Opening Ledger...</div>;

    return (
        <div>
            <div className="flex justify-between items-end mb-8 border-b-2 border-journal-accent/20 pb-4">
                <div>
                    <h1 className="text-5xl font-serif italic text-journal-accent">Gallery Ledger</h1>
                    <p className="text-journal-secondary font-sans mt-2">Manage collection and shipments</p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('inventory')}
                        className={`flex items-center gap-2 px-4 py-2 font-bold uppercase tracking-widest transition-colors ${activeTab === 'inventory' ? 'text-journal-accent border-b-2 border-journal-accent' : 'text-journal-secondary hover:text-foreground'}`}
                    >
                        <Grid size={18} /> Inventory
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex items-center gap-2 px-4 py-2 font-bold uppercase tracking-widest transition-colors ${activeTab === 'orders' ? 'text-journal-accent border-b-2 border-journal-accent' : 'text-journal-secondary hover:text-foreground'}`}
                    >
                        <Package size={18} /> Orders
                    </button>
                </div>
            </div>

            {activeTab === 'inventory' ? (
                /* INVENTORY TAB */
                <>
                    <div className="flex justify-end mb-6">
                        <Link href="/admin/new" className="bg-journal-secondary text-white px-6 py-3 rounded-sm font-serif italic flex items-center gap-2 hover:bg-journal-accent transition-colors">
                            <Plus size={20} /> New Entry
                        </Link>
                    </div>

                    <div className="bg-white border border-journal-paper shadow-sm rounded-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-journal-paper/30 text-journal-secondary font-bold text-xs uppercase tracking-widest">
                                <tr>
                                    <th className="p-4">Artwork</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-journal-paper/50 font-serif">
                                {artworks.map((art) => (
                                    <tr key={art.id} className="hover:bg-journal-paper/10 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                {art.imageUrl && <img src={art.imageUrl} className="w-12 h-12 object-cover border border-journal-paper" />}
                                                <div>
                                                    <p className="font-bold text-foreground text-lg">{art.title}</p>
                                                    <p className="text-xs text-journal-secondary font-sans uppercase tracking-wider">{art.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-foreground font-bold">${art.price}</td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => toggleStatus(art.id, art.status)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${art.status === 'available'
                                                    ? 'border-green-600 text-green-700 bg-green-50'
                                                    : 'border-red-600 text-red-700 bg-red-50'
                                                    }`}
                                            >
                                                {art.status}
                                            </button>
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button className="text-journal-secondary hover:text-foreground p-2">
                                                <Pencil size={18} />
                                            </button>
                                            <button onClick={() => deleteArtwork(art.id)} className="text-red-400 hover:text-red-700 p-2">
                                                <Trash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                /* ORDERS TAB */
                <div className="bg-white border border-journal-paper shadow-sm rounded-sm overflow-hidden min-h-[400px]">
                    {loadingOrders ? (
                        <div className="p-8 text-center text-journal-secondary italic font-serif">Fetching records...</div>
                    ) : orders.length === 0 ? (
                        <div className="p-12 text-center text-journal-secondary italic font-serif text-xl">No orders recorded yet.</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-journal-paper/30 text-journal-secondary font-bold text-xs uppercase tracking-widest">
                                <tr>
                                    <th className="p-4">Order ID</th>
                                    <th className="p-4">Customer</th>
                                    <th className="p-4">Total</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Address</th>
                                    <th className="p-4 text-right">Update</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-journal-paper/50 font-sans text-sm">
                                {orders.map(order => (
                                    <tr key={order.id} className="hover:bg-journal-paper/10">
                                        <td className="p-4 font-mono text-xs">{order.id.slice(0, 8)}...</td>
                                        <td className="p-4 font-bold text-foreground">
                                            {order.profiles?.full_name || 'Guest'}
                                            <div className="text-xs text-journal-secondary font-normal">{order.user_id}</div>
                                        </td>
                                        <td className="p-4 font-serif text-lg">${order.total_amount}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 max-w-xs truncate" title={order.shipping_address}>{order.shipping_address}</td>
                                        <td className="p-4 text-right">
                                            {order.status !== 'shipped' && (
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, 'shipped')}
                                                    className="text-xs bg-journal-accent text-white px-3 py-1 hover:bg-journal-secondary transition-colors"
                                                >
                                                    Mark Shipped
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}

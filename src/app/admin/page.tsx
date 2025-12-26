'use client';
import { supabase } from '@/lib/supabase';
import { useArtworks } from '@/hooks/useArtworks';
import { Pencil, Trash, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const { artworks, loading } = useArtworks();

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'available' ? 'sold' : 'available';
        const { error } = await supabase
            .from('artworks')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            console.error(error);
            alert('Error updating status');
        }
    };

    const deleteArtwork = async (id: string) => {
        if (confirm('Are you sure you want to delete this artwork?')) {
            const { error } = await supabase
                .from('artworks')
                .delete()
                .eq('id', id);

            if (error) {
                console.error(error);
                alert('Error deleting artwork');
            }
        }
    };

    if (loading) return <div className="text-white font-mono">LOADING_DASHBOARD...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-black text-white">INVENTORY CONTROL</h1>
                <Link href="/admin/new" className="bg-brand-neon text-black px-6 py-3 rounded font-bold flex items-center gap-2 hover:opacity-90">
                    <Plus size={20} /> Add New
                </Link>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 font-mono text-xs uppercase">
                        <tr>
                            <th className="p-4">Artwork</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {artworks.map((art) => (
                            <tr key={art.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        {art.imageUrl && <img src={art.imageUrl} className="w-12 h-12 object-cover rounded bg-neutral-800" />}
                                        <div>
                                            <p className="font-bold text-white">{art.title}</p>
                                            <p className="text-xs text-gray-500">{art.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-white font-mono">${art.price}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => toggleStatus(art.id, art.status)}
                                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${art.status === 'available'
                                            ? 'border-green-500 text-green-500'
                                            : 'border-red-500 text-red-500 bg-red-500/10'
                                            }`}
                                    >
                                        {art.status}
                                    </button>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    {/* Edit would go to /admin/edit/[id] - simplified for now */}
                                    <button className="text-gray-400 hover:text-white p-2">
                                        <Pencil size={18} />
                                    </button>
                                    <button onClick={() => deleteArtwork(art.id)} className="text-red-500 hover:text-red-400 p-2">
                                        <Trash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

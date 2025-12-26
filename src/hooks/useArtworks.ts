'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Artwork {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    category: string;
    status: 'available' | 'sold' | 'reserved';
    artistNote: string;
}

export function useArtworks(category?: string) {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchArtworks();

        // Real-time subscription
        const channel = supabase
            .channel('artworks_changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'artworks' },
                (payload) => {
                    fetchArtworks();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [category]);

    async function fetchArtworks() {
        try {
            setLoading(true);

            let query = supabase.from('artworks').select('*');

            if (category && category !== 'All') {
                query = query.eq('category', category);
            }

            const { data, error } = await query.order('created_at', { ascending: false });

            if (error) throw error;
            setArtworks((data as any[]) || []);
        } catch (err: any) {
            console.error("Error fetching artworks:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { artworks, loading, error };
}

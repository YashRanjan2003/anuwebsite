'use client';
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
        setLoading(true);
        // Simple query first, client-side filtering for simplicity unless large dataset
        const q = query(collection(db, 'artworks')); // Remove orderBy for now to avoid index requirements error initally

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Artwork[];

            // Client side filter to handle 'All' and specific categories without complex compound queries requiring indexes immediately
            const filtered = category && category !== 'All'
                ? data.filter(item => item.category === category)
                : data;

            setArtworks(filtered);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching artworks:", err);
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [category]);

    return { artworks, loading, error };
}

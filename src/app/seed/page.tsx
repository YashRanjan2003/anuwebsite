'use client';
import { seedDatabase } from '@/lib/seed';
import { useState } from 'react';

export default function SeedPage() {
    const [status, setStatus] = useState<string>('Ready to seed');
    const [loading, setLoading] = useState(false);

    const handleSeed = async () => {
        setLoading(true);
        setStatus('Seeding...');
        const result = await seedDatabase();
        setStatus(result.message);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-bold">Database Seeder</h1>
            <p className="text-gray-400">Warning: This will attempt to write data to your Firestore.</p>

            <div className="p-4 bg-black rounded border border-white/10 font-mono text-sm max-w-md text-center">
                {status}
            </div>

            <button
                onClick={handleSeed}
                disabled={loading}
                className="px-6 py-3 bg-brand-neon text-black font-bold rounded hover:opacity-90 disabled:opacity-50"
            >
                {loading ? 'Processing...' : 'Seed Database'}
            </button>

            <a href="/" className="text-brand-neon hover:underline mt-8">Back to Home</a>
        </div>
    );
}

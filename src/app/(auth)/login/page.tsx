'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            router.push('/profile');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-background text-foreground">
            <div className="w-full max-w-md space-y-8 animate-fade-in-up">
                <div className="text-center space-y-2">
                    <h1 className="font-serif text-5xl italic text-journal-accent">Welcome Back</h1>
                    <p className="font-hand text-2xl text-journal-secondary">Continue your collection...</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 border border-red-200 rounded-sm font-sans text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6 bg-white p-8 shadow-sm border border-journal-paper/50">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold tracking-widest uppercase text-journal-secondary">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-journal-paper/20 border-b-2 border-journal-secondary/20 p-3 focus:outline-none focus:border-journal-accent transition-colors font-serif text-lg"
                            placeholder="art@lover.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold tracking-widest uppercase text-journal-secondary">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-journal-paper/20 border-b-2 border-journal-secondary/20 p-3 focus:outline-none focus:border-journal-accent transition-colors font-serif text-lg"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-journal-secondary text-white font-serif italic text-xl py-4 hover:bg-journal-accent transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Opening Journal...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center font-sans text-sm text-journal-secondary">
                    New here? <Link href="/signup" className="underline hover:text-journal-accent">Start your journal</Link>
                </p>
            </div>
        </div>
    );
}

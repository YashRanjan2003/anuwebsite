'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Sign up auth user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;

            if (authData.user) {
                // 2. Create profile entry
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: authData.user.id,
                        full_name: fullName,
                    });

                if (profileError) {
                    // Note: If profile creation fails, we might want to warn the user, 
                    // but the auth account is created. For now, just log it.
                    console.error("Profile creation failed:", profileError);
                }

                router.push('/profile');
            }
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
                    <h1 className="font-serif text-5xl italic text-journal-accent">Begin Journey</h1>
                    <p className="font-hand text-2xl text-journal-secondary">Create your art collection...</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 border border-red-200 rounded-sm font-sans text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-6 bg-white p-8 shadow-sm border border-journal-paper/50">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold tracking-widest uppercase text-journal-secondary">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-journal-paper/20 border-b-2 border-journal-secondary/20 p-3 focus:outline-none focus:border-journal-accent transition-colors font-serif text-lg"
                            placeholder="Artist Name"
                        />
                    </div>

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
                        {loading ? 'Creating Account...' : 'Join Now'}
                    </button>
                </form>

                <p className="text-center font-sans text-sm text-journal-secondary">
                    Already have an account? <Link href="/login" className="underline hover:text-journal-accent">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

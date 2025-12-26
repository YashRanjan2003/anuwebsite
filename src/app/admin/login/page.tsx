'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/admin');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md p-8 bg-neutral-900 rounded-xl border border-white/10">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin Access</h1>

                {error && (
                    <div className="bg-red-500/20 text-red-500 p-4 rounded mb-4 text-sm font-mono border border-red-500/50">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm font-mono mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black border border-white/20 rounded p-3 text-white focus:outline-none focus:border-brand-neon"
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm font-mono mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-white/20 rounded p-3 text-white focus:outline-none focus:border-brand-neon"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brand-neon text-black font-bold py-3 rounded hover:opacity-90 transition-opacity"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

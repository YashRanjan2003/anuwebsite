'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (!currentUser && !pathname.includes('/login')) {
                router.push('/admin/login');
            }
        });

        return () => unsubscribe();
    }, [router, pathname]);

    if (loading) return <div className="h-screen bg-black text-white flex items-center justify-center font-mono">LOADING_SYSTEM...</div>;

    if (!user && !pathname.includes('/login')) return null;

    // Don't show layout on login page
    if (pathname.includes('/login')) return <>{children}</>;

    return (
        <div className="min-h-screen bg-[#111] text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex flex-col justify-between hidden md:flex">
                <div>
                    <h2 className="text-2xl font-black mb-8 text-brand-neon">ADMIN CORE</h2>
                    <nav className="space-y-4">
                        <Link href="/admin" className="block text-gray-400 hover:text-white transition-colors text-lg">Dashboard</Link>
                        <Link href="/admin/new" className="block text-gray-400 hover:text-white transition-colors text-lg">New Artwork</Link>
                        <div className="h-px bg-white/10 my-4" />
                        <Link href="/" target="_blank" className="block text-gray-400 hover:text-white transition-colors text-sm font-mono">View Live Site ↗</Link>
                    </nav>
                </div>
                <button onClick={() => auth.signOut()} className="flex items-center gap-2 text-red-500 hover:text-red-400">
                    <LogOut size={16} /> Logout
                </button>
            </aside>

            {/* Mobile Header (simplified) */}
            <div className="md:hidden">
                {/* ... implementation for mobile admin header if needed ... */}
            </div>

            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

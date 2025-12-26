'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

interface ArtworkFormData {
    title: string;
    price: number;
    category: string;
    status: 'available' | 'sold' | 'reserved';
    artistNote: string;
}

export default function ArtworkForm({ initialData, id }: { initialData?: any, id?: string }) {
    const { register, handleSubmit, formState: { errors } } = useForm<ArtworkFormData>({
        defaultValues: initialData || { status: 'available', category: 'Canvas' }
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: ArtworkFormData) => {
        setUploading(true);
        try {
            let imageUrl = initialData?.imageUrl || '';

            // Upload Image if selected
            if (imageFile) {
                const storageRef = ref(storage, `artworks/${Date.now()}-${imageFile.name}`);
                const snapshot = await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const payload = { ...data, imageUrl, price: Number(data.price) };

            if (id) {
                await updateDoc(doc(db, 'artworks', id), payload);
            } else {
                await addDoc(collection(db, 'artworks'), payload);
            }

            router.push('/admin');
        } catch (e) {
            console.error(e);
            alert('Error saving artwork');
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">

            {/* Image Upload */}
            <div className="border border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer relative">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload size={32} className="text-gray-400 mb-2" />
                <p className="text-gray-400 font-mono text-sm">{imageFile ? imageFile.name : 'Click to Upload Image'}</p>
                {initialData?.imageUrl && !imageFile && (
                    <p className="text-green-500 text-xs mt-2">Current image loaded</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-mono text-gray-400">Title</label>
                    <input {...register('title', { required: true })} className="w-full bg-black border border-white/20 p-3 rounded text-white" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-mono text-gray-400">Price ($)</label>
                    <input type="number" {...register('price', { required: true })} className="w-full bg-black border border-white/20 p-3 rounded text-white" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-mono text-gray-400">Category</label>
                    <select {...register('category')} className="w-full bg-black border border-white/20 p-3 rounded text-white">
                        <option value="Canvas">Canvas</option>
                        <option value="Digital">Digital</option>
                        <option value="Sketches">Sketches</option>
                        <option value="Christmas Cards">Christmas Cards</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-mono text-gray-400">Status</label>
                    <select {...register('status')} className="w-full bg-black border border-white/20 p-3 rounded text-white">
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                        <option value="reserved">Reserved</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-mono text-gray-400">Artist Note</label>
                <textarea {...register('artistNote')} rows={4} className="w-full bg-black border border-white/20 p-3 rounded text-white" />
            </div>

            <button disabled={uploading} className="w-full bg-brand-neon text-black font-bold py-4 rounded hover:opacity-90 disabled:opacity-50">
                {uploading ? 'SAVING...' : 'SAVE ARTWORK'}
            </button>

        </form>
    );
}

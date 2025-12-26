import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, writeBatch, doc } from 'firebase/firestore';

const DUMMY_ARTWORKS = [
    {
        title: 'Neon Saint',
        price: 250,
        imageUrl: 'https://placehold.co/600x800/1a1a1a/ccff00/png?text=Neon+Saint',
        category: 'Digital',
        status: 'available',
        artistNote: 'A futuristic interpretation of classical iconography.'
    },
    {
        title: 'Winter Solace',
        price: 800,
        imageUrl: 'https://placehold.co/600x800/2a2a2a/ffffff/png?text=Winter+Solace',
        category: 'Canvas',
        status: 'available',
        artistNote: 'Acrylic on canvas, capturing the silent cold.'
    },
    {
        title: 'Glitch Pine',
        price: 45,
        imageUrl: 'https://placehold.co/600x800/111111/00ffaa/png?text=Glitch+Pine',
        category: 'Christmas Cards',
        status: 'available',
        artistNote: 'Pack of 12 luxury holiday cards with glitch art.'
    },
    {
        title: 'Cyber Skull',
        price: 120,
        imageUrl: 'https://placehold.co/600x800/000000/ff0055/png?text=Cyber+Skull',
        category: 'Sketches',
        status: 'reserved',
        artistNote: 'Graphite sketch with digital overlay.'
    },
    {
        title: 'Acid Rain',
        price: 300,
        imageUrl: 'https://placehold.co/600x800/333333/ffff00/png?text=Acid+Rain',
        category: 'Digital',
        status: 'available',
        artistNote: 'Limited print. Signed by the artist.'
    }
];

export async function seedDatabase() {
    try {
        const batch = writeBatch(db);
        const collectionRef = collection(db, 'artworks');

        // Check if empty to avoid duplicates (optional, but good for safety)
        const snapshot = await getDocs(collectionRef);
        if (!snapshot.empty) {
            console.log('Database already has data. Skipping seed.');
            return { success: false, message: 'Database already populated' };
        }

        for (const artwork of DUMMY_ARTWORKS) {
            const docRef = doc(collectionRef); // Generate new ID
            batch.set(docRef, artwork);
        }

        await batch.commit();
        console.log('Seeding complete!');
        return { success: true, message: 'Seeding successful' };
    } catch (error: any) {
        console.error('Error seeding database:', error);
        return { success: false, message: error.message };
    }
}

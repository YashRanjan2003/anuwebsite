'use client';
import { useState } from 'react';
import HeroSpotlight from '@/components/HeroSpotlight';
import CategoryPills from '@/components/CategoryPills';
import ArtFeed from '@/components/ArtFeed';
import ProductDrawer from '@/components/ProductDrawer';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="bg-brand-dark min-h-screen text-white pb-24 md:pb-0">
      <HeroSpotlight />

      <div className="relative z-20 bg-brand-dark min-h-screen rounded-t-[3rem] -mt-12 overflow-hidden shadow-[0_-20px_40px_rgba(0,0,0,0.5)] border-t border-white/5">
        <div className="pt-8">
          <CategoryPills activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          <ArtFeed selectedCategory={activeCategory} onProductSelect={setSelectedProduct} />
        </div>
      </div>

      <ProductDrawer product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}

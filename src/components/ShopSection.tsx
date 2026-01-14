import { useEffect, useRef, useState } from "react";
import ProductCard from './ProductCard';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import heroHec from '@/assets/hero-hec.png';
import { Button } from '@/components/ui/button';

type CollectionKey = 'hecho-en-candela' | 'basics';

interface Collection {
  id: CollectionKey;
  name: string;
  query?: string;
}

const collections: Collection[] = [
  { id: 'hecho-en-candela', name: 'HECHO EN CANDELA', query: 'tag:hecho-en-candela' },
  { id: 'basics', name: 'Basics', query: 'tag:basics' },
];

const ShopSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCollection, setActiveCollection] = useState<CollectionKey>('hecho-en-candela');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const collection = collections.find(c => c.id === activeCollection);
        const data = await fetchProducts(20, collection?.query);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [activeCollection]);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-grid');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="shop" className="bg-white">
      {/* Hero Banner - Full screen style like TRUE shop */}
      <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden pt-14 md:pt-16">
        {/* Background Image */}
        <img 
          src={heroHec} 
          alt="FUEGO - Hecho en Candela" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        {/* Dark overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Navigation Arrows */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors">
          <ChevronLeft size={20} className="text-neutral-800" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors">
          <ChevronRight size={20} className="text-neutral-800" />
        </button>

        {/* CTA Button at bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <Button 
            onClick={scrollToProducts}
            className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3 text-xs tracking-[0.2em] uppercase font-medium"
          >
            Shop Now
          </Button>
        </div>
      </div>

      {/* Collection Tabs - Horizontal scroll like TRUE shop */}
      <div className="border-b border-neutral-200 bg-white sticky top-14 md:top-16 z-30">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide py-4">
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setActiveCollection(collection.id)}
                className={`whitespace-nowrap text-xs md:text-sm tracking-[0.1em] uppercase font-medium transition-all duration-300 pb-1 border-b-2 ${
                  activeCollection === collection.id
                    ? 'text-neutral-900 border-neutral-900'
                    : 'text-neutral-500 border-transparent hover:text-neutral-700'
                }`}
              >
                {collection.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div 
        id="products-grid"
        ref={sectionRef} 
        className={`container max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Products Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-lg mb-2">No hay productos disponibles</p>
            <p className="text-sm text-neutral-400">
              Los productos aparecerán aquí cuando se agreguen a la tienda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <div
                key={product.node.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopSection;

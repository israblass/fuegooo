import { useEffect, useRef, useState } from "react";
import ProductCard from './ProductCard';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { Loader2 } from 'lucide-react';
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
      {/* Hero Section - Split Layout */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] pt-14 md:pt-16">
        {/* Mobile: Image First */}
        <div className="md:hidden w-full">
          <img 
            src={heroHec} 
            alt="FUEGO - Hecho en Candela" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Left Side - Text Content */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center px-8 py-12 md:py-0">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-neutral-900 mb-6">
              FUEGO
            </h1>
            <p className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-600 mb-8">
              Hecho en Candela
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToProducts}
                className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3 text-xs tracking-[0.2em] uppercase font-medium"
              >
                Explorar Colección
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - Image (Desktop Only) */}
        <div className="hidden md:flex w-1/2 bg-neutral-100 items-center justify-center overflow-hidden">
          <img 
            src={heroHec} 
            alt="FUEGO - Hecho en Candela" 
            className="h-full w-auto max-w-none object-contain"
          />
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

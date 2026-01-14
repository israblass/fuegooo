import { useEffect, useRef, useState } from "react";
import ProductCard from './ProductCard';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { Loader2 } from 'lucide-react';

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

  const activeCollectionData = collections.find(c => c.id === activeCollection);

  return (
    <section id="shop" className="min-h-screen bg-background py-20 md:py-32 noise-overlay grid-pattern relative">
      <div ref={sectionRef} className={`container max-w-6xl mx-auto px-6 transition-all duration-1000 ease-out relative z-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
            COLLETIONS
          </h2>
          
          {/* Collection Tabs */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setActiveCollection(collection.id)}
                className={`text-lg md:text-2xl font-light tracking-tight transition-all duration-300 pb-2 border-b-2 ${
                  activeCollection === collection.id
                    ? 'text-foreground border-foreground'
                    : 'text-muted-foreground border-transparent hover:text-foreground/70'
                }`}
              >
                {collection.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-2">No hay productos disponibles</p>
            <p className="text-sm text-muted-foreground/70">
              Los productos aparecerán aquí cuando se agreguen a la tienda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
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

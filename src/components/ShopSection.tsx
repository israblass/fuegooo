import { useEffect, useRef, useState } from "react";
import ProductCard from './ProductCard';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { Loader2 } from 'lucide-react';
import heroHecMobile from '@/assets/hero-hec.png';
import heroHecDesktop from '@/assets/hero-hec-desktop.png';

const ShopSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        const data = await fetchProducts(20);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <section id="shop" className="bg-white">
      {/* Hero Section - Responsive Art Direction */}
      <div className="w-full pt-14 md:pt-16">
        {/* Mobile Image - vertical motorbike */}
        <img 
          src={heroHecMobile} 
          alt="FUEGO - Hecho en Candela" 
          className="w-full h-auto object-contain md:hidden"
        />
        {/* Desktop Image - horizontal banner */}
        <img 
          src={heroHecDesktop} 
          alt="FUEGO - Hecho en Candela" 
          className="hidden md:block w-full h-auto object-cover"
        />
      </div>

      {/* Products Section */}
      <div 
        id="products-grid"
        ref={sectionRef} 
        className={`container max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
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

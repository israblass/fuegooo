import { useEffect, useRef, useState } from "react";
import ProductCard from './ProductCard';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  id: string;
  title?: string;
  query?: string;
  maxProducts?: number;
  vendorFilter?: string;
  typeFilter?: string;
  /** Filter by keyword in title (case-insensitive) */
  titleFilter?: string;
  /** Max items to display after filtering */
  displayLimit?: number;
}

const sortPriority = (product: ShopifyProduct): number => {
  const title = product.node.title.toLowerCase();
  const type = (product.node.productType || '').toLowerCase();
  if (title.includes('oversized set')) return 0;
  if (title.includes('hoodie')) return 1;
  if (title.includes('sweatpants')) return 2;
  if (title.includes('tee') || type.includes('camiseta')) return 3;
  if (type.includes('gorra') || title.includes('cap')) return 4;
  return 3;
};

const ProductGrid = ({ id, title, query, maxProducts = 50, vendorFilter, typeFilter, titleFilter, displayLimit }: ProductGridProps) => {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts(maxProducts, query);
        let filtered = data.filter(p => p.node.images?.edges?.length > 0);

        if (vendorFilter) {
          filtered = filtered.filter(p => {
            const t = p.node.title.toLowerCase();
            if (vendorFilter.toLowerCase() === 'hecho en candela') {
              return t.startsWith('fuego®') && !t.includes('dad cap') && !t.includes('trucker cap') && !t.includes('hecho en candela tee');
            }
            if (vendorFilter.toLowerCase() === 'fuego') {
              return t.includes('dad cap') || t.includes('trucker cap') || t.includes('hecho en candela tee');
            }
            return true;
          });
        }

        if (typeFilter) {
          filtered = filtered.filter(p => {
            const type = (p.node.productType || '').toLowerCase();
            return type.includes(typeFilter.toLowerCase());
          });
        }

        if (titleFilter) {
          const kw = titleFilter.toLowerCase();
          filtered = filtered.filter(p => p.node.title.toLowerCase().includes(kw));
        }

        filtered.sort((a, b) => sortPriority(a) - sortPriority(b));

        if (displayLimit) {
          filtered = filtered.slice(0, displayLimit);
        }

        setProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [maxProducts, query, vendorFilter, typeFilter, titleFilter, displayLimit]);

  return (
    <section id={id} className="bg-[#f5f5f5]" style={{ padding: '80px 0' }}>
      <div
        ref={sectionRef}
        className={`max-w-[1400px] mx-auto px-4 md:px-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {title && (
          <h2 className="text-center text-[12px] tracking-[0.2em] uppercase text-neutral-900 font-semibold mb-10 md:mb-14">
            {title}
          </h2>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-sm uppercase tracking-wider">No hay productos disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style={{ gap: '2px' }}>
            {products.map((product, index) => (
              <div
                key={product.node.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
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

export default ProductGrid;

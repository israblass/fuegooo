import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

const SCROLL_Y_KEY = 'fuego_scroll_y';

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  
  // Get front (first) and back (second) images from Shopify
  const frontImage = node.images?.edges?.[0]?.node?.url;
  const backImage = node.images?.edges?.[1]?.node?.url;
  
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants?.edges?.[0]?.node;

  // Determine which image to show: back on hover/tap, front otherwise
  const showBackImage = (isHovered || isTapped) && backImage;
  const currentImage = showBackImage ? backImage : frontImage;

  const formatPrice = (amount: string, currency: string) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!firstVariant) return;

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    toast.success('Agregado al carrito', {
      description: node.title,
      position: 'top-center',
    });
  };

  // Handle touch for mobile - toggle on first tap
  const handleTouchStart = () => {
    if (backImage) {
      setIsTapped(prev => !prev);
    }
  };

  return (
    <Link
      to={`/product/${node.handle}`}
      onClick={() => {
        sessionStorage.setItem(SCROLL_Y_KEY, String(window.scrollY));
      }}
      className="product-card group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
    >
      {/* Product Image - 3:4 aspect ratio with hover transition */}
      <div className="aspect-[3/4] bg-background overflow-hidden mb-4 relative">
        {currentImage ? (
          <>
            {/* Front Image */}
            <img
              src={frontImage}
              alt={node.title}
              className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-500 ${
                showBackImage ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {/* Back Image - only render if exists */}
            {backImage && (
              <img
                src={backImage}
                alt={`${node.title} - Vista trasera`}
                className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-500 ${
                  showBackImage ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Sin imagen
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium tracking-wide uppercase text-foreground">
            {node.title}
          </h3>
          <span className="text-sm font-light text-muted-foreground">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
        </div>

        {/* Buy Button - Solid black, sharp corners */}
        <button 
          onClick={handleAddToCart}
          className="w-full py-3 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 hover:bg-foreground/90"
        >
          Agregar
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;

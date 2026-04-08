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

  const frontImage = node.images?.edges?.[0]?.node?.url;
  const backImage = node.images?.edges?.[1]?.node?.url;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants?.edges?.[0]?.node;

  const showBack = isHovered && backImage;

  const formatPrice = (amount: string, currency: string) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency', currency, minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    addItem({
      product, variantId: firstVariant.id, variantTitle: firstVariant.title,
      price: firstVariant.price, quantity: 1, selectedOptions: firstVariant.selectedOptions || [],
    });
    toast.success('Agregado al carrito', { description: node.title, position: 'top-center' });
  };

  return (
    <Link
      to={`/product/${node.handle}`}
      onClick={() => sessionStorage.setItem(SCROLL_Y_KEY, String(window.scrollY))}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="aspect-[3/4] bg-[#f5f5f5] overflow-hidden mb-3 relative">
        {frontImage ? (
          <>
            <img src={frontImage} alt={node.title}
              className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-500 ${showBack ? 'opacity-0' : 'opacity-100'}`} />
            {backImage && (
              <img src={backImage} alt={`${node.title} - back`}
                className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-500 ${showBack ? 'opacity-100' : 'opacity-0'}`} />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs uppercase tracking-wider">Sin imagen</div>
        )}
        {/* Quick add overlay */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 py-2.5 bg-black text-white text-[10px] tracking-[0.2em] uppercase text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Agregar al carrito
        </button>
      </div>

      {/* Info */}
      <h3 className="text-[11px] md:text-xs tracking-[0.1em] uppercase text-neutral-900 font-medium mb-1">
        {node.title}
      </h3>
      <span className="text-[11px] md:text-xs tracking-wider" style={{ color: '#666666' }}>
        {formatPrice(price.amount, price.currencyCode)}
      </span>
    </Link>
  );
};

export default ProductCard;

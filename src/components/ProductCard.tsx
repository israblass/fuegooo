import { Link } from 'react-router-dom';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const imageUrl = node.images?.edges?.[0]?.node?.url;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants?.edges?.[0]?.node;

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

  return (
    <Link to={`/product/${node.handle}`} className="product-card group block">
      {/* Product Image - 3:4 aspect ratio */}
      <div className="aspect-[3/4] bg-product-bg overflow-hidden mb-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={node.title}
            className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          />
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
          className="w-full py-3 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-foreground/90"
        >
          Agregar
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;

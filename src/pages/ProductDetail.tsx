import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Import local cap images for Dad Cap color mapping
import capBlack from '@/assets/cap-black.png';
import capSand from '@/assets/cap-sand.png';
import capPink from '@/assets/cap-pink.png';
import capRed from '@/assets/cap-red.png';
import capMilitaryGreen from '@/assets/cap-military-green.png';
import capRoyalBlue from '@/assets/cap-royal-blue.png';
import capWashedBlack from '@/assets/cap-washed-black.png';

// Import Trucker Classic images
import truckerBlack from '@/assets/trucker-black-white.png';
import truckerFullBlack from '@/assets/trucker-full-black.png';
import truckerWhite from '@/assets/trucker-white.png';
import truckerWine from '@/assets/trucker-wine.png';
import truckerSand from '@/assets/trucker-sand.png';
import truckerNavy from '@/assets/trucker-navy.png';

// Import Black Hec image
import blackHecBack from '@/assets/black-hec-back.png';

// Dad Cap color to local image mapping
const dadCapImageMap: Record<string, string> = {
  'Black': capBlack,
  'Sand': capSand,
  'Pink': capPink,
  'Red': capRed,
  'Military Green': capMilitaryGreen,
  'Royal Blue': capRoyalBlue,
  'Washed Black': capWashedBlack,
};

// Trucker Classic color to local image mapping
const truckerImageMap: Record<string, string> = {
  'Black': truckerBlack,
  'Full Black': truckerFullBlack,
  'Classic White': truckerWhite,
  'Wine': truckerWine,
  'Sand': truckerSand,
  'Navy': truckerNavy,
};

// Black Hec default image
const blackHecImageMap: Record<string, string> = {
  'default': blackHecBack,
};

// Get the correct image map based on product handle
const getImageMap = (handle: string): Record<string, string> => {
  if (handle === 'trucker-classic') {
    return truckerImageMap;
  }
  if (handle === 'black-hec') {
    return blackHecImageMap;
  }
  return dadCapImageMap;
};

// Get image style based on product handle
const getImageStyle = (handle: string): string => {
  if (handle === 'dad-cap') {
    return 'w-full h-full object-cover scale-150 transition-transform duration-500 hover:scale-[1.6]';
  }
  return 'w-full h-full object-cover transition-transform duration-500 hover:scale-110';
};

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    // Ensure the intro gate doesn’t re-appear when navigating back to "/"
    sessionStorage.setItem('fuego_intro_done', '1');
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        
        // Set initial image based on product type and first variant color
        if (data && handle) {
          const imageMap = getImageMap(handle);
          
          // For Black Hec, use the default back image
          if (handle === 'black-hec' && imageMap['default']) {
            setCurrentImageUrl(imageMap['default']);
          } else {
            const firstVariant = data.variants?.edges?.[0]?.node;
            const colorOption = firstVariant?.selectedOptions?.find(opt => opt.name === 'Color');
            if (colorOption && imageMap[colorOption.value]) {
              setCurrentImageUrl(imageMap[colorOption.value]);
            } else if (data.images?.edges?.[0]?.node?.url) {
              setCurrentImageUrl(data.images.edges[0].node.url);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  // Update image when variant changes
  const handleVariantChange = (variantIndex: number) => {
    setSelectedVariantIndex(variantIndex);
    
    if (product && handle) {
      const imageMap = getImageMap(handle);
      const variant = product.variants?.edges?.[variantIndex]?.node;
      const colorOption = variant?.selectedOptions?.find(opt => opt.name === 'Color');
      
      if (colorOption && imageMap[colorOption.value]) {
        setCurrentImageUrl(imageMap[colorOption.value]);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-4">Producto no encontrado</p>
          <Link to="/" className="text-foreground underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants?.edges?.[selectedVariantIndex]?.node;

  const formatPrice = (amount: string, currency: string) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const shopifyProduct: ShopifyProduct = {
      node: product
    };

    addItem({
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });

    toast.success('Agregado al carrito', {
      description: `${product.title} x ${quantity}`,
      position: 'top-center',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onGoHome={() => {}} />
      
      <main className="pt-32 md:pt-48 pb-20">
        <div className="container max-w-6xl mx-auto px-6">
          {/* Back Button - More visible */}
          <button 
            onClick={() => {
              if (window.history.length > 1) navigate(-1);
              else navigate('/');
            }}
            className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-8 py-2"
          >
            <ArrowLeft size={20} />
            <span className="text-base tracking-wide font-medium">Volver</span>
          </button>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Main Image with Zoom Effect */}
            <div className="space-y-4">
              <div className="aspect-square bg-product-bg overflow-hidden cursor-zoom-in">
                {currentImageUrl ? (
                  <img
                    src={currentImageUrl}
                    alt={product.title}
                    className={handle ? getImageStyle(handle) : 'w-full h-full object-cover transition-transform duration-500 hover:scale-110'}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Sin imagen
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-light text-foreground mb-2">
                  {product.title}
                </h1>
                <p className="text-xl text-foreground">
                  {formatPrice(
                    selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount,
                    selectedVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode
                  )}
                </p>
              </div>

              {product.descriptionHtml ? (
                <div 
                  className="text-muted-foreground leading-relaxed prose prose-sm max-w-none [&>p]:mb-4 [&>br]:block"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : product.description ? (
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              ) : null}

              {/* Variant Options - Color buttons now change image */}
              {product.options && product.options.length > 0 && product.options[0].name !== "Title" && (
                <div className="space-y-4">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const variantIndex = product.variants?.edges?.findIndex(
                            v => v.node.selectedOptions?.some(
                              opt => opt.name === option.name && opt.value === value
                            )
                          );
                          
                          return (
                            <button
                              key={value}
                              onClick={() => variantIndex !== undefined && variantIndex >= 0 && handleVariantChange(variantIndex)}
                              className={`px-4 py-2 text-sm border transition-all duration-200 ${
                                selectedVariant?.selectedOptions?.some(
                                  opt => opt.name === option.name && opt.value === value
                                )
                                  ? 'border-foreground bg-foreground text-background'
                                  : 'border-border hover:border-foreground hover:bg-muted/10'
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Cantidad
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-muted/10 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-muted/10 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
                className="w-full py-6 bg-foreground text-background hover:bg-foreground/90"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {selectedVariant?.availableForSale ? 'Agregar al Carrito' : 'Agotado'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;

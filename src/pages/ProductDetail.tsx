import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Minus, Plus, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ProductImage {
  url: string;
  altText: string | null;
}

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    // Ensure the intro gate doesn't re-appear when navigating back to "/"
    sessionStorage.setItem('fuego_intro_done', '1');
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        
        // Extract all images from Shopify
        if (data?.images?.edges) {
          const images: ProductImage[] = data.images.edges.map((edge: { node: { url: string; altText: string | null } }) => ({
            url: edge.node.url,
            altText: edge.node.altText,
          }));
          setProductImages(images);
          setSelectedImageIndex(0);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  // Update image when variant changes (if variant has specific image)
  const handleVariantChange = (variantIndex: number) => {
    setSelectedVariantIndex(variantIndex);
    // Reset to first image when variant changes
    setSelectedImageIndex(0);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center">
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
  const currentImage = productImages[selectedImageIndex];

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
    <div className="min-h-[100dvh] bg-background">
      <Navbar
        onGoHome={() => {
          // Force Home to show the pre-entry gate again
          sessionStorage.removeItem('fuego_intro_done');
          navigate('/');
        }}
      />

      <main className="pt-32 md:pt-48 pb-20">
        <div className="container max-w-6xl mx-auto px-6">
          {/* Back Button */}
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
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image with Navigation Arrows */}
              <div className="aspect-square bg-product-bg overflow-hidden relative group">
                {currentImage ? (
                  <img
                    src={currentImage.url}
                    alt={currentImage.altText || product.title}
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Sin imagen
                  </div>
                )}
                
                {/* Navigation Arrows - Only show if multiple images */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Gallery - Only show if multiple images */}
              {productImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 bg-product-bg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImageIndex === index
                          ? 'border-foreground'
                          : 'border-transparent hover:border-muted-foreground/50'
                      }`}
                      aria-label={`Ver imagen ${index + 1}`}
                    >
                      <img
                        src={image.url}
                        alt={image.altText || `${product.title} - Vista ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
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

              {/* Variant Options */}
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

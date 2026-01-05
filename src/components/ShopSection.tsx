import ProductCard from './ProductCard';
import productHoodie from '@/assets/product-hoodie.png';
import productShorts from '@/assets/product-shorts.png';
import productTshirt from '@/assets/product-tshirt.png';
import productPants from '@/assets/product-pants.png';

const products = [
  {
    id: 1,
    image: productHoodie,
    name: 'Essentials Hoodie',
    price: '$85',
  },
  {
    id: 2,
    image: productTshirt,
    name: 'Core Tee',
    price: '$45',
  },
  {
    id: 3,
    image: productPants,
    name: 'Classic Pants',
    price: '$75',
  },
  {
    id: 4,
    image: productShorts,
    name: 'Essential Shorts',
    price: '$55',
  },
];

const ShopSection = () => {
  return (
    <section id="shop" className="min-h-screen bg-background py-20 md:py-32">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-2">
            Colección
          </h2>
          <p className="text-2xl md:text-3xl font-light text-foreground tracking-tight">
            The Essentials
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <ProductCard
                image={product.image}
                name={product.name}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;

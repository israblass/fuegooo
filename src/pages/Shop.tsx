import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';

const Shop = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar />
      <main className="pt-24 md:pt-32">
        <ProductGrid id="shop-all" title="SHOP ALL" maxProducts={100} />
      </main>
      <Footer />
    </div>
  );
};

export default Shop;

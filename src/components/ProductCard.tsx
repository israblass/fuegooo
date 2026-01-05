interface ProductCardProps {
  image: string;
  name: string;
  price: string;
}

const ProductCard = ({ image, name, price }: ProductCardProps) => {
  return (
    <div className="product-card group">
      {/* Product Image */}
      <div className="aspect-square bg-muted/10 overflow-hidden mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium tracking-wide uppercase text-foreground">
            {name}
          </h3>
          <span className="text-sm font-light text-muted-foreground">
            {price}
          </span>
        </div>

        {/* Buy Button */}
        <button className="product-buy-btn w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Agregar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

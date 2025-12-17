
const defaultProducts = [
  {
    name: "Premium Headphones",
    description: "High-fidelity sound with active noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    price: "$299"
  },
  {
    name: "Smart Watch",
    description: "Track your fitness and stay connected",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    price: "$399"
  },
  {
    name: "Wireless Speaker",
    description: "360° sound with deep bass technology",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    price: "$199"
  },
  {
    name: "Camera Lens",
    description: "Professional-grade optics for stunning photos",
    image: "https://images.unsplash.com/photo-1606913084603-3e7702b01627?w=400&h=300&fit=crop",
    price: "$599"
  },
  {
    name: "Laptop Stand",
    description: "Ergonomic design for better posture",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    price: "$79"
  },
  {
    name: "Mechanical Keyboard",
    description: "Tactile switches for perfect typing experience",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
    price: "$159"
  }
];

const ProductCards = ({ 
  title = "Featured Products",
  products = defaultProducts,
  className = "" 
}) => {
  // Split products into 3 rows
  const row1 = products.slice(0, Math.ceil(products.length / 3));
  const row2 = products.slice(Math.ceil(products.length / 3), Math.ceil(products.length * 2 / 3));
  const row3 = products.slice(Math.ceil(products.length * 2 / 3));

  // Duplicate for seamless scroll
  const duplicatedRow1 = [...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2];
  const duplicatedRow3 = [...row3, ...row3];

  const ProductCard = ({ product }) => (
    <div className="flex-shrink-0 w-80 bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary/50">
      <div className="aspect-video overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
          <span className="text-lg font-bold text-primary">{product.price}</span>
        </div>
        <p className="text-muted-foreground text-sm">{product.description}</p>
      </div>
    </div>
  );

  return (
    <div className={`w-full py-16 bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {title}
        </h2>

        {/* Scrolling Rows */}
        <div className="space-y-8 overflow-hidden">
          {/* Row 1 - Left to Right */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex gap-8 animate-scroll-right min-w-max">
              {[...duplicatedRow1, ...duplicatedRow1].map((product, index) => (
                <ProductCard key={`row1-${index}`} product={product} />
              ))}
            </div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex gap-8 animate-scroll-left min-w-max">
              {[...duplicatedRow2, ...duplicatedRow2].map((product, index) => (
                <ProductCard key={`row2-${index}`} product={product} />
              ))}
            </div>
          </div>

          {/* Row 3 - Left to Right */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex gap-8 animate-scroll-right min-w-max">
              {[...duplicatedRow3, ...duplicatedRow3].map((product, index) => (
                <ProductCard key={`row3-${index}`} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
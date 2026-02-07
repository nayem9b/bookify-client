import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const getRandomBooks = (books, count = 10) => {
  // Shuffle array and take first 10
  const shuffled = [...books].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length)).map((book) => ({
    name: book.title || book.name || "Untitled",
    description: book.description || book.shortDescription || "A great read",
    image:
      book.image_url ||
      book.small_image_url ||
      book.image ||
      "https://images.unsplash.com/photo-1507842217343-583f7270bed1?w=400&h=300&fit=crop",
    price: `$${book.price || 0}`,
    id: book._id || book.id,
  }));
};

const ProductCards = ({ title = "Featured Books", className = "" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const API_BASE = process.env.REACT_APP_API_URL || "/api";
        const response = await fetch(`${API_BASE}/books`);

        if (response.ok) {
          const books = await response.json();
          const randomBooks = getRandomBooks(books, 10);
          setProducts(randomBooks);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Guard clause: return loading state if products not ready
  if (!products || products.length === 0) {
    return (
      <div className={`w-full py-16 bg-background ${className}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-600">Loading featured books...</p>
        </div>
      </div>
    );
  }

  // Split products into 3 rows
  const row1 = products.slice(0, Math.ceil(products.length / 3));
  const row2 = products.slice(
    Math.ceil(products.length / 3),
    Math.ceil((products.length * 2) / 3)
  );
  const row3 = products.slice(Math.ceil((products.length * 2) / 3));

  // Duplicate for seamless scroll
  const duplicatedRow1 = [...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2];
  const duplicatedRow3 = [...row3, ...row3];

  const ProductCard = ({ product }) => (
    <Link to={`/books/${product._id || product.id}`} className="no-underline">
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
            <h3 className="text-xl font-semibold text-foreground">
              {product.name}
            </h3>
            <span className="text-lg font-bold text-primary">
              {product.price}
            </span>
          </div>
          <p className="text-muted-foreground text-sm">{product.description}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className={`w-full py-16 bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text bg-gradient-to-r from-slate-700 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
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

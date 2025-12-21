import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../Context/UserContext";
import useAdmin from "../../Hooks/useAdmin";
import useBuyer from "../../Hooks/useBuyer";
import useSeller from "../../Hooks/useSeller";
import { FiShoppingCart } from "react-icons/fi";

const TrialBookDetailsCard = ({ book, setItem, setPrice, setPicture }) => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  const [isSeller] = useSeller(user?.email);
  const {
    name,
    description,
    price,
    mobileNumber,
    originalPrice,
    date,
    image_url,
    condition,
    place,
    email,
    userName,
    isVerified,
    category,
    _id,
    id,
  } = book;

  const bookId = _id || id;

  const wishlist = {
    name: name,
    price: price,
    email: user?.email,
    userImage: user?.photoURL,
    productImage: image_url,
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please sign in to add to wishlist");
      return;
    }

    fetch("http://localhost:5000/wishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(wishlist),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Added to wishlist");
      })
      .catch(() => toast.error("Failed to add to wishlist"));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isBuyer) {
      toast.error("You need to be a buyer to add items to cart");
      return;
    }

    setItem(name);
    setPrice(price);
    setPicture(image_url);
    toast.success("Added to cart");
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <Link to={`/books/${bookId}`} aria-label={`View ${name}`}>
          <motion.img
            src={
              image_url || "https://via.placeholder.com/300x400?text=No+Image"
            }
            alt={name || "Book cover"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/300x400?text=No+Image";
            }}
          />
        </Link>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 z-20 px-2 py-1 rounded-full bg-red-500 text-white text-xs font-bold shadow-md">
            -{discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleAddToWishlist}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 text-slate-600 hover:text-red-500 shadow-sm transition-opacity duration-200 opacity-0 group-hover:opacity-90"
          aria-label="Add to wishlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.6"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Add to Cart Button */}
        {isBuyer && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 z-10 p-2 rounded-md bg-white text-slate-700 hover:text-indigo-600 shadow-sm transition-opacity duration-200 opacity-0 group-hover:opacity-90"
            title="Add to cart"
          >
            <FiShoppingCart className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col p-3">
        {/* Title & Author */}
        <Link
          to={`/books/${bookId}`}
          className="block mb-1"
          aria-label={`Open ${name}`}
        >
          <h3 className="text-sm font-semibold text-slate-900 truncate leading-tight hover:text-indigo-600 transition-colors">
            {name}
          </h3>
        </Link>

        <p className="text-xs text-slate-600 mb-2 line-clamp-1">
          <span className="font-medium text-emerald-600">{userName}</span>
          {isVerified && <span className="ml-1 text-green-600">✓</span>}
        </p>

        {/* Description Preview */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-2 flex-1">
          {description}
        </p>

        {/* Price & Category */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-1">
            {price && (
              <p className="text-sm font-bold text-slate-900">
                <span className="text-xs">$</span>
                {parseFloat(price).toFixed(2)}
              </p>
            )}
            {originalPrice && (
              <p className="text-xs font-medium text-slate-400 line-through">
                ${parseFloat(originalPrice).toFixed(2)}
              </p>
            )}
          </div>

          {category && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-normal bg-gray-100 text-gray-700">
              {category}
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500 space-y-1">
          {condition && <div>📖 {condition}</div>}
          {place && <div>📍 {place}</div>}
          {date && <div>📅 {date}</div>}
        </div>
      </div>
    </motion.div>
  );
};

export default TrialBookDetailsCard;

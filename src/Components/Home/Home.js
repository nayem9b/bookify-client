import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/UserContext";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiBookOpen,
  FiStar,
  FiClock,
  FiTrendingUp,
  FiArrowRight,
  FiAward,
  FiUsers,
  FiBookmark,
  FiBook,
  FiTwitter,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import reading from "../../Images/reading.jpg";
import PartneredWith from "../PartneredWith/partneredWith";
import ProductCards from "../FeaturedProducts/ProductCard";
import ViewSubscription from "../subscription/ViewSubscription";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Mock data for categories
    const mockCategories = [
      { _id: 1, name: "Fiction", count: 124 },
      { _id: 2, name: "Science", count: 89 },
      { _id: 3, name: "Biography", count: 67 },
      { _id: 4, name: "History", count: 92 },
      { _id: 5, name: "Technology", count: 45 },
      { _id: 6, name: "Self-Help", count: 78 },
    ];
    setCategories(mockCategories);
  }, []);

  // Mock data for featured books
  const featuredBooks = [
    {
      _id: 1,
      title: "The Great Adventure",
      author: "John Doe",
      price: 24.99,
      rating: 4.8,
      // image: 'https://source.unsplash.com/random/400x600/?book-cover,novel'
    },
    {
      _id: 2,
      title: "Digital Fortress",
      author: "Jane Smith",
      price: 19.99,
      rating: 4.5,
      // image: 'https://source.unsplash.com/random/400x600/?book,technology'
    },
    {
      _id: 3,
      title: "The Hidden Truth",
      author: "Alex Johnson",
      price: 29.99,
      rating: 4.9,
      // image: 'https://source.unsplash.com/random/400x600/?mystery,book'
    },
    {
      _id: 4,
      title: "Future of AI",
      author: "Sam Wilson",
      price: 34.99,
      rating: 4.7,
      // image: 'https://source.unsplash.com/random/400x600/?ai,technology'
    },
  ];

  const { user } = useContext(AuthContext);
  // user variable available for future use

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative py-20 md:py-32 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 -skew-y-3 transform origin-top-left"></div>

        <div className="relative container mx-auto px-6 py-4 md:py-32 lg:flex lg:items-center lg:justify-between mt-[-100px]">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="lg:w-1/2 space-y-6 z-10"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Discover Your Next{" "}
              <span className="text-yellow-300">Favorite</span> Book
            </motion.h1>

            <motion.p
              className="text-xl text-indigo-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Explore thousands of books across various genres. Find your next
              read today!
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="relative max-w-xl mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-indigo-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 border-0 rounded-xl bg-white/90 text-gray-900 placeholder-indigo-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500 shadow-lg"
                placeholder="Search for books, authors, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-medium px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg"
              >
                Search
                <FiArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-sm font-medium text-indigo-100">
                Popular:
              </span>
              {["Fiction", "Mystery", "Science", "Biography"].map(
                (tag, index) => (
                  <Link key={tag} to={`/category/${tag.toLowerCase()}`}>
                    <motion.span
                      key={tag}
                      whileHover={{
                        y: -2,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }}
                      className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm cursor-pointer hover:bg-white/30 transition-all duration-200 text-white"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {tag}
                    </motion.span>
                  </Link>
                )
              )}
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:block lg:w-1/2 relative z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-yellow-400 rounded-2xl -z-10"></div>
              <div className="relative bg-white p-2 rounded-xl shadow-2xl transform rotate-2">
                <img
                  src={reading}
                  alt="Reading"
                  className="rounded-lg max-w-sm w-full h-auto shadow-lg"
                />
                
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-xl">
                  
                  <div className="bg-indigo-600 text-white p-2 rounded-full">
                    <FiBookOpen className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Section - Enhanced with Skew Effect */}
      <motion.section
        className="relative py-24 md:py-32 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Skewed Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 -skew-y-3 transform origin-top-left"></div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-6 py-24 md:py-32">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <FiBookOpen className="w-4 h-4" />
              <span>Explore Categories</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 relative">
              Browse by Category
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </h2>

            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Discover books across all genres and find your next favorite read
              in our carefully curated categories.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {categories?.map((category, index) => (
              <motion.div
                key={category?._id || index}
                variants={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover="hover"
                className="relative group"
              >
                <div className="absolute -inset-1 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200"></div>
                <Link
                  to={`/category/${category?.name?.toLowerCase() || "all"}`}
                  className="relative block p-6 bg-white/10 backdrop-blur-sm rounded-3xl h-full text-center border border-white/20 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:bg-white/20"
                >
                  <motion.div
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-5 relative shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-white/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FiBookOpen className="h-10 w-10 text-indigo-600 z-10" />
                    <motion.div
                      className="absolute -inset-1 bg-white/40 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-1000"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1.2, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>

                  <motion.h3
                    className="font-bold text-gray-800 text-lg mb-2"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    {category?.name || "Uncategorized"}
                  </motion.h3>

                  <motion.div
                    className="text-sm text-indigo-600 font-medium px-3 py-1.5 bg-indigo-50 backdrop-blur-sm rounded-full inline-flex items-center"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                    {category?.count || 0}{" "}
                    {category?.count === 1 ? "book" : "books"}
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Categories Button */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/categories"
              className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 group border border-white/30"
            >
              View All Categories
              <FiArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Trending Now - Ultra Modern Design */}
      <motion.section
        className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/30 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-amber-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <FiTrendingUp className="w-4 h-4" />
              <span>Trending This Week</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 relative">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Trending Now
              </span>
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the most popular books our readers can't put down.
              <span className="text-indigo-600 font-semibold">
                {" "}
                Updated every hour
              </span>{" "}
              with real-time trending data.
            </p>
          </motion.div>

          {/* Quick Filter Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {[
              "All",
              "Fiction",
              "Non-Fiction",
              "Mystery",
              "Romance",
              "Sci-Fi",
            ].map((filter, index) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  index === 0
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200"
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Book Grid */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredBooks?.slice(0, 4).map((book, index) => (
                <motion.div
                  key={book?._id || index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{
                    y: -12,
                    transition: {
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

                  <div className="relative h-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 backdrop-blur-sm">
                    {/* Enhanced Image Section */}
                    <div className="relative pt-[150%] overflow-hidden">
                      {/* <img
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        src={
                          book?.image ||
                          "../../Assets/Companies/placeholder_book.png"
                        }
                        alt={book?.title || "Book Cover"}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "../../Assets/Companies/placeholder_book.png";
                        }}
                      /> */}

                      {/* Multi-layer Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Enhanced Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className="px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg">
                          #1 Trending
                        </span>
                        <span className="px-3 py-1.5 text-xs font-semibold bg-white/95 text-indigo-600 rounded-full backdrop-blur-sm">
                          Bestseller
                        </span>
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                        >
                          <FiBookmark className="w-4 h-4 text-indigo-600" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                        >
                          <FiStar className="w-4 h-4 text-amber-500" />
                        </motion.button>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-3 h-3 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-gray-700 ml-1">
                            {book?.rating || 4.8}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                          {book?.title || "Untitled Book"}
                        </h3>
                        <p className="text-indigo-600 font-semibold mb-3 text-sm">
                          by {book?.author || "Unknown Author"}
                        </p>

                        {/* Enhanced Stats */}
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <FiUsers className="w-4 h-4" />
                            <span>2.4k readers</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiClock className="w-4 h-4" />
                            <span>3h read</span>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Price & Actions */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-2xl font-bold text-gray-900">
                              ${book?.price?.toFixed(2) || "0.00"}
                            </span>
                            {book?.originalPrice && (
                              <span className="ml-2 text-sm text-gray-400 line-through">
                                ${book.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-green-600 font-semibold">
                              -20% OFF
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <span>Add to Cart</span>
                            <FiArrowRight className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-3 border-2 border-indigo-200 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-300"
                          >
                            <FiBookmark className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced View All Section */}
            <motion.div
              className="text-center mt-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Want to see more trending books?
                </h3>
                <p className="text-gray-600 mb-6">
                  Explore our complete collection of trending books and discover
                  your next favorite read.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/books"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 group"
                  >
                    Browse All Books
                    <FiArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/trending"
                    className="inline-flex items-center px-8 py-4 border-2 border-indigo-200 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-300 group"
                  >
                    View Trending
                    <FiTrendingUp className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <ProductCards />

      {/* Personalized for You Section - Enhanced with Skew Effect */}
      <motion.section
        className="relative py-24 md:py-32 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Skewed Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 -skew-y-3 transform origin-top-left"></div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            className="text-center mb-20"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <FiBookOpen className="w-4 h-4" />
              <span>AI-Powered Recommendations</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 relative">
              Personalized for You
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </h2>

            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Discover books tailored to your reading preferences with our
              advanced AI recommendation engine.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Based on Your History",
                description: "Books similar to what you've loved before",
                icon: <FiBook className="w-6 h-6" />,
                color: "from-white/20 to-white/30",
                books: [
                  "The Silent Patient",
                  "Where the Crawdads Sing",
                  "Educated",
                ],
              },
              {
                title: "Trending in Your Genre",
                description: "Popular books in your favorite categories",
                icon: <FiTrendingUp className="w-6 h-6" />,
                color: "from-white/20 to-white/30",
                books: [
                  "Project Hail Mary",
                  "The Midnight Library",
                  "Klara and the Sun",
                ],
              },
              {
                title: "Editor's Choice",
                description: "Handpicked by our book experts",
                icon: <FiAward className="w-6 h-6" />,
                color: "from-white/20 to-white/30",
                books: [
                  "The Seven Husbands of Evelyn Hugo",
                  "Circe",
                  "The Song of Achilles",
                ],
              },
            ].map((recommendation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 group-hover:bg-white/20">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${recommendation.color} flex items-center justify-center text-white mb-6 shadow-lg`}
                  >
                    {recommendation.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {recommendation.title}
                  </h3>
                  <p className="text-indigo-100 mb-6 text-lg">
                    {recommendation.description}
                  </p>
                  <div className="space-y-3 mb-6">
                    {recommendation.books.map((book, bookIndex) => (
                      <div
                        key={bookIndex}
                        className="flex items-center gap-3 text-white"
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-sm font-medium">{book}</span>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50"
                  >
                    View Recommendations
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto border border-white/20">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to discover your next favorite book?
              </h3>
              <p className="text-indigo-100 mb-8 text-lg">
                Get personalized recommendations based on your reading history
                and preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-300 shadow-lg"
                >
                  Get Recommendations
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Browse All Books
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Access Toolbar */}
      <motion.section
        className="py-16 bg-white border-t border-b border-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Access
            </h2>
            <p className="text-gray-600">
              Everything you need, right at your fingertips
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              {
                name: "New Releases",
                icon: <FiBook className="w-6 h-6" />,
                color: "indigo",
                link: "/new-releases",
              },
              {
                name: "Best Sellers",
                icon: <FiAward className="w-6 h-6" />,
                color: "amber",
                link: "/bestsellers",
              },
              {
                name: "Free Books",
                icon: <FiBookOpen className="w-6 h-6" />,
                color: "green",
                link: "/free-books",
              },
              {
                name: "Audio Books",
                icon: <FiBookmark className="w-6 h-6" />,
                color: "purple",
                link: "/audiobooks",
              },
              {
                name: "My Library",
                icon: <FiUsers className="w-6 h-6" />,
                color: "blue",
                link: "/library",
              },
              {
                name: "Wishlist",
                icon: <FiStar className="w-6 h-6" />,
                color: "pink",
                link: "/wishlist",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group"
              >
                <Link
                  to={item.link}
                  className={`block p-6 rounded-2xl bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 hover:from-${item.color}-100 hover:to-${item.color}-200 transition-all duration-300 text-center group-hover:shadow-lg`}
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-${item.color}-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {item.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Reading Progress & Achievements */}
      <motion.section
        className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-cyan-200/40 to-blue-200/40 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Start Your Reading Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of readers and begin your personalized reading
              adventure with our community-driven platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
                  12
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Join Our Community
                </h3>
                <p className="text-gray-600 mb-4">
                  Connect with fellow book lovers and discover new favorites
                  together!
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  50,000+ active readers
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                  5
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Discover New Books
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore our curated collection of trending and recommended
                  books!
                </p>
                <div className="flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    >
                      📚
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  2.4k
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Get Started Today
                </h3>
                <p className="text-gray-600 mb-4">
                  Sign up now and get access to thousands of books!
                </p>
                <div className="text-3xl font-bold text-cyan-600">🚀</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Social Proof & Community */}
      <motion.section
        className="py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-violet-200/40 to-purple-200/40 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-indigo-200/40 to-blue-200/40 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Join Our Community
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with fellow book lovers, share reviews, and discover your
              next favorite read.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Book Clubs",
                description: "Join discussions with 10,000+ active members",
                icon: <FiUsers className="w-8 h-8" />,
                color: "from-violet-500 to-purple-500",
                members: "10,000+",
              },
              {
                title: "Reading Challenges",
                description: "Participate in monthly reading challenges",
                icon: <FiAward className="w-8 h-8" />,
                color: "from-purple-500 to-indigo-500",
                members: "5,000+",
              },
              {
                title: "Author Events",
                description: "Meet your favorite authors in virtual events",
                icon: <FiBookOpen className="w-8 h-8" />,
                color: "from-indigo-500 to-blue-500",
                members: "2,000+",
              },
              {
                title: "Reviews & Ratings",
                description: "Share your thoughts and help others discover",
                icon: <FiStar className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-500",
                members: "50,000+",
              },
            ].map((community, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${community.color} flex items-center justify-center text-white mb-4`}
                >
                  {community.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {community.title}
                </h3>
                <p className="text-gray-600 mb-4">{community.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">
                    {community.members} members
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Join Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Partnered with */}
      <PartneredWith />
      {/* Features */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block bg-indigo-100 text-indigo-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Best Bookstore Experience
            </h2>
            <p className="text-gray-600 text-lg">
              We're dedicated to bringing you the best reading experience with
              our carefully curated collection of books from around the world.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <FiTrendingUp className="h-6 w-6 text-white" />,
                title: "Wide Selection",
                description:
                  "Thousands of books across all genres to satisfy every reader's taste, from bestsellers to hidden gems.",
                color: "from-indigo-500 to-purple-500",
              },
              {
                icon: <FiClock className="h-6 w-6 text-white" />,
                title: "Fast Delivery",
                description:
                  "Get your books delivered to your doorstep with our fast and reliable shipping options worldwide.",
                color: "from-amber-500 to-pink-500",
              },
              {
                icon: <FiStar className="h-6 w-6 text-white" />,
                title: "Quality Guaranteed",
                description:
                  "We ensure all our books meet the highest quality standards before they reach your hands.",
                color: "from-emerald-500 to-cyan-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="group"
              >
                <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 p-0.5">
                  <div className="bg-gradient-to-br rounded-2xl p-6 h-full">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{feature.description}</p>
                    <div className="flex items-center text-indigo-600 font-medium">
                      <span className="mr-2">Learn more</span>
                      <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="relative overflow-hidden py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 -skew-y-3 transform origin-top-left"></div>

        <div className="relative container mx-auto px-6 z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to start reading?
            </h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join our community of book lovers and discover your next favorite
              story. Sign up now and get 15% off your first order!
            </p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/signup"
                  className="inline-block px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/books"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  Browse Collection
                  <FiArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4 text-indigo-100 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-300 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-300 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Cancel anytime
              </div>
            </motion.div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full filter blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-300/20 rounded-full filter blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
      </motion.section>

      <ViewSubscription />

      {/* Modern Testimonials Carousel */}
      <motion.section
        className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-200/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <FiStar className="w-4 h-4" />
              <span>Community Love</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                What Our Readers Say
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Real stories from our amazing community of book lovers around the
              world
            </p>
          </motion.div>

          {/* Moving Testimonials Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-8"
                animate={{
                  x: [0, -100 * 3], // Move 3 cards worth
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
                style={{ width: "max-content" }}
              >
                {[
                  {
                    quote:
                      "Bookify has completely transformed my reading habits. The AI recommendations are spot-on and I've discovered so many amazing books I never would have found otherwise!",
                    author: "Sarah Johnson",
                    role: "Avid Reader",
                    image:
                      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                    twitter: "@sarahj_reads",
                    rating: 5,
                    date: "2 days ago",
                  },
                  {
                    quote:
                      "The user experience is absolutely seamless! I love how easy it is to discover new authors and the delivery is always prompt. My book club members are jealous!",
                    author: "Michael Chen",
                    role: "Book Club Organizer",
                    image:
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                    twitter: "@mikechen_books",
                    rating: 5,
                    date: "1 week ago",
                  },
                  {
                    quote:
                      "As a student, I appreciate the affordable prices and the wide range of academic books. The study guides and summaries are incredibly helpful for my courses!",
                    author: "Emily Rodriguez",
                    role: "University Student",
                    image:
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                    twitter: "@emily_studies",
                    rating: 5,
                    date: "3 days ago",
                  },
                  {
                    quote:
                      "The personalized reading lists are incredible! I've read more books in the past 6 months than I did in the previous 2 years. Bookify is a game-changer!",
                    author: "David Kim",
                    role: "Software Engineer",
                    image:
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                    twitter: "@davidkim_tech",
                    rating: 5,
                    date: "5 days ago",
                  },
                  {
                    quote:
                      "The community features are amazing! I've connected with so many like-minded readers and discovered books through their recommendations. It's like having a personal book club!",
                    author: "Lisa Wang",
                    role: "Marketing Manager",
                    image:
                      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
                    twitter: "@lisawang_reads",
                    rating: 5,
                    date: "1 day ago",
                  },
                  {
                    quote:
                      "The audio book integration is fantastic! I can seamlessly switch between reading and listening during my commute. The narrator quality is top-notch!",
                    author: "James Wilson",
                    role: "Business Analyst",
                    image:
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
                    twitter: "@jamesw_business",
                    rating: 5,
                    date: "4 days ago",
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-96 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                    // subtle floating animation (no size changes)
                    animate={{
                      y: [0, -6, 0],
                      rotate: [0, -0.6, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: index * 0.35,
                    }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() =>
                      window.open(
                        `https://x.com/${testimonial.twitter.replace("@", "")}`,
                        "_blank"
                      )
                    }
                  >
                    {/* Header with rating and date */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FiStar
                            key={i}
                            className="w-4 h-4 text-amber-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {testimonial.date}
                      </span>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-700 mb-6 leading-relaxed text-lg">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {testimonial.author}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      {/* X (Twitter) Icon */}
                      <div className="flex items-center space-x-2 text-indigo-600 group-hover:text-indigo-700 transition-colors">
                        <FaXTwitter className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {testimonial.twitter}
                        </span>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Gradient Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-indigo-50/50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-indigo-50/50 to-transparent pointer-events-none z-10"></div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-gray-600 mb-6">
              Join thousands of happy readers and start your journey today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Reading Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-300"
              >
                View All Reviews
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section
        className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: <FiBook className="w-8 h-8 mx-auto mb-4" />,
                number: "10,000+",
                label: "Books Available",
              },
              {
                icon: <FiUsers className="w-8 h-8 mx-auto mb-4" />,
                number: "50,000+",
                label: "Happy Readers",
              },
              {
                icon: <FiAward className="w-8 h-8 mx-auto mb-4" />,
                number: "100+",
                label: "Award Winners",
              },
              {
                icon: <FiBookmark className="w-8 h-8 mx-auto mb-4" />,
                number: "24/7",
                label: "Support",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-indigo-100">{stat.icon}</div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </h3>
                <p className="text-indigo-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-12 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to start your reading journey?
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Join thousands of readers who trust Bookify for their next great
              read. Sign up now and get 15% off your first order!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 text-center"
              >
                Get Started - It's Free
              </Link>
              <Link
                to="/books"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 text-center"
              >
                Browse Books
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section
        className="py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter for the latest book releases,
              exclusive offers, and reading recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 shadow-sm"
                aria-label="Email address for newsletter subscription"
              />
              <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;

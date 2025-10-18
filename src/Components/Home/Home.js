import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
} from "react-icons/fi";
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

        <div className="relative container mx-auto px-6 py-24 md:py-32 lg:flex lg:items-center lg:justify-between">
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

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
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
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200"></div>
                <Link
                  to={`/category/${category?.name?.toLowerCase() || "all"}`}
                  className="relative block p-6 bg-white dark:bg-gray-800 rounded-2xl h-full text-center border-2 border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5 relative shadow-inner"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-800/40 dark:to-purple-800/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FiBookOpen className="h-12 w-12 text-indigo-700 dark:text-indigo-300 z-10" />
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-600/30 dark:to-purple-600/30 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-1000"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1.2, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>

                  <motion.h3
                    className="font-bold text-gray-900 dark:text-white text-xl mb-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    {category?.name || "Uncategorized"}
                  </motion.h3>

                  <motion.p
                    className="text-sm text-gray-500 dark:text-gray-300 font-medium px-2 py-1 bg-gray-50 dark:bg-gray-700/50 rounded-full inline-flex items-center"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-1.5"></span>
                    {category?.count || 0}{" "}
                    {category?.count === 1 ? "book" : "books"}
                  </motion.p>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Books */}
      {/* Featured Books - Modern Design */}
      <motion.section
        className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-indigo-50/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with animated underline */}
          <motion.div
            className="text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
              Trending Now
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-indigo-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              Discover the most popular books our readers can't put down
            </p>
          </motion.div>

          {/* Book Grid with staggered animation */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredBooks?.slice(0, 4).map((book, index) => (
                <motion.div
                  key={book?._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{
                    y: -8,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                  className="group"
                >
                  <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-100">
                    {/* Image with gradient overlay */}
                    <div className="relative pt-[140%] overflow-hidden">
                      <img
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={book?.image || "/placeholder-book.jpg"}
                        alt={book?.title || "Book Cover"}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder-book.jpg";
                        }}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-semibold bg-white/90 text-indigo-600 rounded-full backdrop-blur-sm">
                          Bestseller
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                          {book?.title || "Untitled Book"}
                        </h3>
                        <p className="text-indigo-600 font-medium mb-3">
                          {book?.author || "Unknown Author"}
                        </p>
                        <div className="flex items-center mb-4">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-5 h-5 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">
                            (24)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-semibold rounded-lg overflow-hidden group"
                        >
                          <span className="relative z-10">Add to Cart</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/books"
                className="inline-flex items-center px-8 py-3.5 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition-colors duration-300 group"
              >
                Browse All Books
                <FiArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <ProductCards />

      {/* Partnered with
       */}

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

      {/* Testimonials */}
      <motion.section
        className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Readers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our community has to
              say about their experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Bookify has completely transformed my reading habits. The selection is incredible and the recommendations are always on point.",
                author: "Sarah Johnson",
                role: "Avid Reader",
              },
              {
                quote:
                  "I love how easy it is to discover new books and authors. The user experience is seamless and the delivery is always prompt.",
                author: "Michael Chen",
                role: "Book Club Organizer",
              },
              {
                quote:
                  "As a student, I appreciate the affordable prices and the wide range of academic books available. Highly recommended!",
                author: "Emily Rodriguez",
                role: "University Student",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="inline-block w-5 h-5 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg mr-4">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 text-center"
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
                className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
              />
              <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-200">
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

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { FiShoppingCart, FiFilter } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "react-hot-toast";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// API base (top-level so it's stable for hooks)
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCategories, setShowCategories] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const dispatch = useDispatch();

  // Extract unique categories from books
  const categories = [
    "All",
    "History",
    "Technology",
    "Fiction",
    "Science",
    "Fantasy",
    "War",
    "Love",
    "Medicine",
    "Art",
    "Craft",
    "Self help",
    ...new Set(books.map((book) => book.genre).filter(Boolean)),
  ];

  // category counts for badges
  const categoryCounts = books.reduce((acc, b) => {
    const g = b.genre || "Unknown";
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {});

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
    toast.success(`${book.title} added to cart!`, {
      position: "bottom-right",
    });
  };

  const firstLoadRef = useRef(true);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const fetchBooks = async () => {
      try {
        // Show full-page loader only on first load; otherwise use category overlay
        if (firstLoadRef.current) {
          setLoading(true);
        } else {
          setIsCategoryLoading(true);
        }

        setError(null);

        // Build URL depending on selected category
        let url = `${API_BASE}/books`;
        if (selectedCategory && selectedCategory !== "All") {
          const encoded = encodeURIComponent(selectedCategory);
          url = `${API_BASE}/categories/${encoded}/books`;
        }

        console.debug("Fetching books from:", url);

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        // Support APIs that return either an array or an object { books: [...] }
        const payload = Array.isArray(data) ? data : data?.books || data?.data || [];
        if (mounted) setBooks(payload || []);
      } catch (err) {
        if (err.name === 'AbortError') {
          // fetch was aborted because selectedCategory changed; ignore
          console.debug('Fetch aborted for previous category');
        } else {
          if (mounted) setError(err.message);
          console.error("Error fetching books:", err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
          setIsCategoryLoading(false);
          firstLoadRef.current = false;
        }
      }
    };

    fetchBooks();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [selectedCategory]);

  // Filter books based on search term
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || book.genre === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Get current books
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Books
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FiFilter className="mr-2 text-teal-600" />
                Categories
              </h3>
              <button
                aria-expanded={showCategories}
                onClick={() => setShowCategories(!showCategories)}
                className="text-sm text-gray-500 hover:text-gray-700 p-1 rounded"
                title={showCategories ? "Hide categories" : "Show categories"}
              >
                {showCategories ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            {showCategories && (
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    placeholder="Search categories"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                    aria-label="Search categories"
                  />
                </div>

                <div className="flex flex-wrap gap-2 max-h-56 overflow-auto py-1">
                  {categories
                    .filter(
                      (c) =>
                        c &&
                        c.toLowerCase().includes(categorySearch.toLowerCase())
                    )
                    .map((category) => {
                      const count =
                        category === "All"
                          ? books.length
                          : categoryCounts[category] || 0;
                      const active = selectedCategory === category;
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => {
                            setIsCategoryLoading(true);
                            setSelectedCategory(category);
                            setCurrentPage(1);
                            // small delay to show feedback
                            setTimeout(() => setIsCategoryLoading(false), 220);
                          }}
                          aria-pressed={active}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all duration-150 focus:outline-none focus:ring-2 ${
                            active
                              ? "bg-teal-600 text-white shadow-sm"
                              : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                          }`}
                        >
                          <span className="truncate max-w-[10rem]">
                            {category}
                          </span>
                          <span
                            className={`inline-block ml-1 text-xs px-2 py-0.5 rounded-full ${
                              active ? "bg-white/20" : "bg-white"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {isCategoryLoading && (
            <div className="fixed inset-0 z-40 flex items-start justify-center pointer-events-none">
              <div className="mt-32 p-3 bg-white/90 backdrop-blur rounded-full shadow-lg">
                <svg
                  className="animate-spin h-6 w-6 text-teal-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              </div>
            </div>
          )}
          <div className="text-center mb-12 mt-4 md:mt-24">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl"
            >
              Our Book Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
            >
              Discover a world of knowledge and adventure
            </motion.p>
          </div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <div className="relative w-full sm:w-96">
              {/* Icon */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
              </div>

              {/* Input */}
              <input
                type="text"
                placeholder="Search by title, author, or genre..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="
      group
      block w-full pl-10 pr-4 py-2.5 
      rounded-xl border border-slate-200 
      bg-slate-50/70 backdrop-blur-sm 
      text-slate-800 placeholder-slate-400
      shadow-sm
      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
      hover:bg-white transition-all duration-300
      sm:text-sm
    "
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600">Show:</span>

              <div className="relative">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="
        appearance-none
        block w-24 px-3 py-2
        text-sm font-medium text-slate-700
        bg-white border border-slate-200 rounded-lg
        shadow-sm
        focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400
        transition-all duration-200 ease-out
        hover:border-slate-300 hover:shadow
      "
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>

                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <svg
                    className="h-4 w-4 text-slate-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </div>
              </div>

              <span className="text-sm font-medium text-slate-600">
                per page
              </span>
            </div>
          </motion.div>

          {/* Books Grid */}
          {filteredBooks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <h3 className="text-lg font-medium text-gray-900">
                No books found
              </h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                <AnimatePresence>
                  {currentBooks.map((book) => (
                    <motion.div
                      key={book._id || book.id}
                      variants={item}
                      className="group relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Link to={`/books/${book._id || book.id}`}>
                          <motion.img
                            src={
                              book.image_url ||
                              "https://via.placeholder.com/300x400?text=No+Image"
                            }
                            alt={book.title || "Book cover"}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/300x400?text=No+Image";
                            }}
                          />
                        </Link>

                        {/* Wishlist button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Add to wishlist handler
                          }}
                          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 text-slate-700 hover:text-red-600 shadow-sm transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                          aria-label="Add to wishlist"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.8"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                          </svg>
                        </button>

                        {/* Add to cart button - appears on hover */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(book);
                          }}
                          className="absolute bottom-4 right-4 z-10 p-3 rounded-full bg-white shadow-lg text-slate-700 hover:text-indigo-600 transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                          title="Add to cart"
                        >
                          <FiShoppingCart className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="p-4">
                        <Link
                          to={`/books/${book._id || book.id}`}
                          className="block group-hover:text-indigo-600 transition-colors duration-200"
                        >
                          <h3 className="text-lg font-semibold text-slate-900 truncate mb-1">
                            {book.original_title}
                          </h3>
                        </Link>

                        <p className="text-sm text-slate-600 mb-2">
                          by{" "}
                          <span className="font-medium text-slate-800">
                            {book.author || "Unknown"}
                          </span>
                        </p>

                        {book.price && (
                          <p className="text-lg font-bold text-slate-900">
                            ${parseFloat(book.price).toFixed(2)}
                          </p>
                        )}

                        {book.genre && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 mt-2">
                            {book.genre}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-12 flex flex-col sm:flex-row items-center justify-between"
                >
                  <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstBook + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastBook, filteredBooks.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{filteredBooks.length}</span>{" "}
                    results
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <FaArrowLeft />
                    </button>

                    <div className="flex items-center space-x-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          // Show first page, last page, current page, and pages around current page
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => {
                                paginate(pageNum);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className={`w-10 h-10 flex items-center justify-center rounded-md ${
                                currentPage === pageNum
                                  ? "bg-indigo-600 text-white"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                              r
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <span className="px-2">...</span>
                      )}

                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <button
                          onClick={() => {
                            paginate(totalPages);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`w-10 h-10 flex items-center justify-center rounded-md ${
                            currentPage === totalPages
                              ? "bg-indigo-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {totalPages}
                        </button>
                      )}
                    </div>

                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;

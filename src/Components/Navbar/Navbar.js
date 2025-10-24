import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { 
  FiSearch, 
  FiUser, 
  FiHeart, 
  FiBook, 
  FiMenu, 
  FiX, 
  FiChevronDown,
  FiHome,
  FiList,
  FiSettings,
  FiLogOut,
  FiShoppingBag,
  FiBookOpen,
  FiStar,
  FiGift,
  FiHelpCircle,
  FiBell,
  FiShoppingCart,
  FiTrendingUp,
  FiAward,
  FiBookmark
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../redux/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import navicon from "../../Images/icons8-open-book-64.png";
import CartSidebar from "../Cart/CartSidebar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Close dropdowns when clicking outside
  const userMenuRef = useRef(null);
  const categoriesMenuRef = useRef(null);
  const discoverMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only handle click outside for user menu (which should remain click-based)
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      // Categories and Discover are now hover-based, so we don't need click outside detection for them
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      setIsUserMenuOpen(false);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const categories = [
    { name: "Fiction", icon: <FiBook className="w-4 h-4" />, path: "/category/fiction" },
    { name: "Non-Fiction", icon: <FiBookOpen className="w-4 h-4" />, path: "/category/non-fiction" },
    { name: "Mystery", icon: <FiBookmark className="w-4 h-4" />, path: "/category/mystery" },
    { name: "Romance", icon: <FiHeart className="w-4 h-4" />, path: "/category/romance" },
    { name: "Science Fiction", icon: <FiStar className="w-4 h-4" />, path: "/category/sci-fi" },
    { name: "Biography", icon: <FiUser className="w-4 h-4" />, path: "/category/biography" },
    { name: "History", icon: <FiBook className="w-4 h-4" />, path: "/category/history" },
    { name: "Self-Help", icon: <FiTrendingUp className="w-4 h-4" />, path: "/category/self-help" },
  ];

  const userMenuItems = [
    { name: "Dashboard", icon: <FiHome className="w-4 h-4" />, path: "/dashboard" },
    { name: "My Orders", icon: <FiShoppingBag className="w-4 h-4" />, path: "/dashboard/myorders" },
    { name: "Wishlist", icon: <FiHeart className="w-4 h-4" />, path: "/wishlist" },
    { name: "Settings", icon: <FiSettings className="w-4 h-4" />, path: "/settings" },
    { name: "Help & Support", icon: <FiHelpCircle className="w-4 h-4" />, path: "/help" },
  ];

  const quickLinks = [
    { name: "New Releases", icon: <FiBook className="w-4 h-4" />, path: "/new-releases" },
    { name: "Best Sellers", icon: <FiAward className="w-4 h-4" />, path: "/bestsellers" },
    { name: "Free Books", icon: <FiGift className="w-4 h-4" />, path: "/free-books" },
    { name: "Audio Books", icon: <FiBookOpen className="w-4 h-4" />, path: "/audiobooks" },
  ];

  const discoverItems = [
    { 
      name: "Trending Now", 
      icon: <FiTrendingUp className="w-4 h-4" />, 
      path: "/trending",
      description: "What's popular right now"
    },
    { 
      name: "Editor's Choice", 
      icon: <FiStar className="w-4 h-4" />, 
      path: "/editors-choice",
      description: "Handpicked by our experts"
    },
    { 
      name: "Book of the Month", 
      icon: <FiAward className="w-4 h-4" />, 
      path: "/book-of-month",
      description: "Featured monthly selection"
    },
    { 
      name: "Reading Lists", 
      icon: <FiBookmark className="w-4 h-4" />, 
      path: "/reading-lists",
      description: "Curated collections"
    },
    { 
      name: "Author Spotlights", 
      icon: <FiUser className="w-4 h-4" />, 
      path: "/authors",
      description: "Meet your favorite authors"
    },
    { 
      name: "Book Clubs", 
      icon: <FiBookOpen className="w-4 h-4" />, 
      path: "/book-clubs",
      description: "Join reading communities"
    },
  ];

  const additionalNavItems = [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
    { name: "Help Center", path: "/help" },
  ];

  return (
    <header className="fixed w-full z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40 pointer-events-none"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img
                src={navicon}
                alt="Bookify"
                className="h-8 w-8 md:h-10 md:w-10"
              />
            </motion.div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Bookify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Home */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              <FiHome className="w-4 h-4" />
              <span>Home</span>
            </Link>

            {/* Categories Dropdown */}
            <div 
              className="relative" 
              ref={categoriesMenuRef}
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                <FiList className="w-4 h-4" />
                <span>Categories</span>
                <FiChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse Categories</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {categories.map((category, index) => (
                          <Link
                            key={index}
                            to={category.path}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors group"
                            onClick={() => setIsCategoriesOpen(false)}
                          >
                            <div className="text-indigo-600 group-hover:text-indigo-700">
                              {category.icon}
                            </div>
                            <span className="text-gray-700 group-hover:text-indigo-700 font-medium">
                              {category.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Books */}
            <Link
              to="/books"
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              <FiBook className="w-4 h-4" />
              <span>Books</span>
            </Link>

            {/* Discover Dropdown */}
            <div 
              className="relative" 
              ref={discoverMenuRef}
              onMouseEnter={() => setIsDiscoverOpen(true)}
              onMouseLeave={() => setIsDiscoverOpen(false)}
            >
              <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                <FiTrendingUp className="w-4 h-4" />
                <span>Discover</span>
                <FiChevronDown className={`w-4 h-4 transition-transform ${isDiscoverOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDiscoverOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Discover More</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {discoverItems.map((item, index) => (
                          <Link
                            key={index}
                            to={item.path}
                            className="flex items-start space-x-3 p-4 rounded-lg hover:bg-indigo-50 transition-colors group"
                            onClick={() => setIsDiscoverOpen(false)}
                          >
                            <div className="text-indigo-600 group-hover:text-indigo-700 mt-1">
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <span className="text-gray-700 group-hover:text-indigo-700 font-medium block">
                                {item.name}
                              </span>
                              <span className="text-sm text-gray-500 group-hover:text-indigo-600">
                                {item.description}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Additional Navigation Items */}
            <div className="flex items-center space-x-6">
              {additionalNavItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search books, authors, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </form>
          </div> */}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button (Mobile) */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="hidden md:block p-2 text-gray-600 hover:text-indigo-600 transition-colors relative"
            >
              <FiHeart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-red-500 rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Notifications */}
            <button className="hidden md:block p-2 text-gray-600 hover:text-indigo-600 transition-colors relative">
              <FiBell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-indigo-500 rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>

            {/* Cart */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-red-500 rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <FiChevronDown className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.email?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user.email}</p>
                            <p className="text-sm text-gray-500">Premium Member</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        {userMenuItems.map((item, index) => (
                          <Link
                            key={index}
                            to={item.path}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors group"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <div className="text-gray-500 group-hover:text-indigo-600">
                              {item.icon}
                            </div>
                            <span className="text-gray-700 group-hover:text-indigo-600 font-medium">
                              {item.name}
                            </span>
                          </Link>
                        ))}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors group text-left"
                        >
                          <FiLogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                          <span className="text-gray-700 group-hover:text-red-600 font-medium">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200"
          >
            <div className="p-4">
              <form onSubmit={handleSearch} className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search books, authors, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-200 shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <Link
                  to="/"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiHome className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-gray-900">Home</span>
                </Link>
                
                <Link
                  to="/books"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiBook className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-gray-900">Books</span>
                </Link>

                <Link
                  to="/categories"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiList className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-gray-900">Categories</span>
                </Link>

                {/* Additional Navigation Items for Mobile */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">More</h3>
                  <div className="space-y-2">
                    {additionalNavItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Discover Section */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Discover</h3>
                <div className="space-y-2">
                  {discoverItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="text-indigo-600 mt-1">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900 block">{item.name}</span>
                        <span className="text-sm text-gray-500">{item.description}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Links</h3>
                <div className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      <span className="font-medium text-gray-900">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* User Actions */}
              {user ? (
                <div className="border-t border-gray-200 pt-4">
                  <div className="space-y-2">
                    {userMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.icon}
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors text-left"
                    >
                      <FiLogOut className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-red-600">Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <Link
                    to="/signin"
                    className="block w-full text-center py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartSidebar />
    </header>
  );
};

export default Navbar;


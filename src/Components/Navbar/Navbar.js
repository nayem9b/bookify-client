import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/UserContext";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../redux/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import navicon from "../../Images/icons8-open-book-64.png";
import CartSidebar from "../Cart/CartSidebar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Categories", path: "/categories" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src={navicon}
              alt="Bookify"
              className="h-8 w-8 md:h-10 md:w-10 transition-transform group-hover:rotate-12"
            />
            <span
              className={`text-xl md:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                scrolled
                  ? "from-indigo-600 to-purple-600"
                  : "from-white to-white"
              }`}
            >
              Bookify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    scrolled
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      scrolled
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-3 ml-4">
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </nav>

            {/* Cart Button */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 rounded-full hover:bg-gray-100"
            >
              <FaShoppingCart
                className={`${
                  scrolled ? "text-gray-700" : "text-white"
                } h-5 w-5`}
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-red-600 rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="pt-2 space-y-2">
              <Link
                to="/signin"
                className="block w-full px-3 py-2 rounded-md text-center text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block w-full px-3 py-2 rounded-md text-center text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
        
      </div>
      <CartSidebar />
    </header>
    
  );
};

export default Navbar;

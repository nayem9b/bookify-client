import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {
  FiSearch,
  FiHeart,
  FiMenu,
  FiX,
  FiChevronDown,
  FiShoppingCart,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../redux/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import CartSidebar from "../Cart/CartSidebar";
import WishlistSidebar from "../Wishlist/WishlistSidebar";
import { toggleWishlist } from "../../redux/slices/wishlistSlice";

const categories = [
  { name: "Fiction", value: "Fiction" },
  { name: "Non-fiction", value: "Non-Fiction" },
  { name: "Mystery", value: "Mystery" },
  { name: "Romance", value: "Romance" },
  { name: "Science fiction", value: "Sci-fi" },
  { name: "Biography", value: "Biography" },
  { name: "History", value: "History" },
  { name: "Self-help", value: "Self-help" },
];

const navItems = [
  { name: "Books", path: "/books" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const userMenuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "My orders", path: "/dashboard/myorders" },
  { name: "Wishlist", path: "/dashboard/wishlist" },
  { name: "Settings", path: "/settings" },
];

const navLinkClass = ({ isActive }) =>
  `text-[15px] transition-colors hover:text-cloth ${
    isActive ? "text-cloth underline decoration-2 underline-offset-[10px]" : "text-ink"
  }`;

const CountBadge = ({ count }) =>
  count > 0 ? (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-stamp px-1 text-[11px] font-semibold leading-none text-paper">
      {count}
    </span>
  ) : null;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useSelector((state) => state.cart);
  const wishlistCount = useSelector((state) =>
    state.wishlist && state.wishlist.items ? state.wishlist.items.length : 0
  );
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const userMenuRef = useRef(null);
  const categoriesMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (
        categoriesMenuRef.current &&
        !categoriesMenuRef.current.contains(event.target)
      ) {
        setIsCategoriesOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsUserMenuOpen(false);
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Close menus after navigating.
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsCategoriesOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      setIsUserMenuOpen(false);
      toast.success("Signed out");
    } catch (error) {
      toast.error("Couldn't sign out. Try again.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchQuery.trim();
    if (term) {
      navigate(`/books?search=${encodeURIComponent(term)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const handleCategoryClick = (categoryValue) => {
    navigate("/books", { state: { selectedCategory: categoryValue } });
    setIsCategoriesOpen(false);
    setIsMenuOpen(false);
  };

  const initial = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <>
    <header className="fixed z-50 w-full border-b border-rule bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6 md:h-20 lg:px-8">
        <Link
          to="/"
          className="font-spine text-[28px] font-extrabold uppercase leading-none tracking-wide text-ink"
        >
          Bookify
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          <div className="relative" ref={categoriesMenuRef}>
            <button
              type="button"
              aria-expanded={isCategoriesOpen}
              aria-haspopup="true"
              onClick={() => setIsCategoriesOpen((open) => !open)}
              className="flex items-center gap-1 text-[15px] text-ink transition-colors hover:text-cloth"
            >
              Categories
              <FiChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform ${
                  isCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isCategoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-4 w-72 rounded-md border border-rule bg-paper p-2 shadow-[0_12px_32px_-12px_rgba(30,42,40,0.35)]"
                >
                  <ul className="grid grid-cols-2">
                    {categories.map((category) => (
                      <li key={category.value}>
                        <button
                          type="button"
                          onClick={() => handleCategoryClick(category.value)}
                          className="w-full rounded px-3 py-2 text-left text-sm text-ink hover:bg-paper-deep"
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/categories"
                    className="mt-1 block border-t border-rule px-3 pb-1 pt-3 text-sm font-semibold text-cloth hover:underline"
                  >
                    All categories
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClass}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <form
          onSubmit={handleSearch}
          role="search"
          className="ml-auto hidden max-w-xs flex-1 items-center rounded border border-ink/20 bg-white/60 focus-within:border-stamp md:flex"
        >
          <label htmlFor="nav-search" className="sr-only">
            Search books
          </label>
          <FiSearch aria-hidden="true" className="ml-3 h-4 w-4 text-ink-faint" />
          <input
            id="nav-search"
            type="search"
            placeholder="Search books"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-0 bg-transparent px-2 py-2 text-sm text-ink placeholder:text-ink-faint focus:ring-0"
          />
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <button
            type="button"
            onClick={() => dispatch(toggleWishlist())}
            className="relative hidden rounded p-2 text-ink hover:text-cloth md:block"
            aria-label={`Open wishlist (${wishlistCount})`}
          >
            <FiHeart className="h-5 w-5" />
            <CountBadge count={wishlistCount} />
          </button>

          <button
            type="button"
            onClick={() => dispatch(toggleCart())}
            className="relative rounded p-2 text-ink hover:text-cloth"
            aria-label={`Open cart (${cartItemCount})`}
          >
            <FiShoppingCart className="h-5 w-5" />
            <CountBadge count={cartItemCount} />
          </button>

          {user ? (
            <div className="relative ml-2 hidden lg:block" ref={userMenuRef}>
              <button
                type="button"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
                aria-label="Account menu"
                onClick={() => setIsUserMenuOpen((open) => !open)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cloth text-sm font-semibold text-paper"
              >
                {initial}
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 w-60 rounded-md border border-rule bg-paper p-2 shadow-[0_12px_32px_-12px_rgba(30,42,40,0.35)]"
                  >
                    <p className="truncate border-b border-rule px-3 pb-3 pt-1 text-sm text-ink-soft">
                      {user.email}
                    </p>
                    <ul className="py-1">
                      {userMenuItems.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className="block rounded px-3 py-2 text-sm text-ink hover:bg-paper-deep"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded border-t border-rule px-3 py-2 text-left text-sm text-ink hover:bg-paper-deep"
                    >
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="ml-3 hidden items-center gap-4 lg:flex">
              <Link
                to="/signin"
                className="text-[15px] text-ink hover:text-cloth"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded bg-cloth px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-cloth-dark"
              >
                Create account
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="rounded p-2 text-ink lg:hidden"
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-rule bg-paper lg:hidden"
          >
            <div className="space-y-6 px-4 py-6 sm:px-6">
              <form
                onSubmit={handleSearch}
                role="search"
                className="flex items-center rounded border border-ink/20 bg-white/60 focus-within:border-stamp md:hidden"
              >
                <label htmlFor="mobile-search" className="sr-only">
                  Search books
                </label>
                <FiSearch
                  aria-hidden="true"
                  className="ml-3 h-4 w-4 text-ink-faint"
                />
                <input
                  id="mobile-search"
                  type="search"
                  placeholder="Search books"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-0 bg-transparent px-2 py-3 text-base text-ink placeholder:text-ink-faint focus:ring-0"
                />
              </form>

              <ul className="divide-y divide-rule border-y border-rule">
                {[{ name: "Home", path: "/" }, ...navItems].map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="block py-3 text-lg text-ink">
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      dispatch(toggleWishlist());
                    }}
                    className="w-full py-3 text-left text-lg text-ink"
                  >
                    Wishlist{wishlistCount > 0 && ` (${wishlistCount})`}
                  </button>
                </li>
              </ul>

              <div>
                <h2 className="text-sm font-semibold text-ink-soft">
                  Categories
                </h2>
                <ul className="mt-2 grid grid-cols-2">
                  {categories.map((category) => (
                    <li key={category.value}>
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(category.value)}
                        className="w-full py-2 text-left text-ink"
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {user ? (
                <div className="border-t border-rule pt-4">
                  <p className="truncate text-sm text-ink-soft">{user.email}</p>
                  <ul className="mt-2">
                    {userMenuItems.map((item) => (
                      <li key={item.path}>
                        <Link to={item.path} className="block py-2 text-ink">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 py-2 text-ink underline underline-offset-4"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 border-t border-rule pt-5">
                  <Link
                    to="/signin"
                    className="rounded border border-ink/25 py-3 text-center font-semibold text-ink"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded bg-cloth py-3 text-center font-semibold text-paper"
                  >
                    Create account
                  </Link>
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

    </header>
    {/* Outside the header so their fixed overlays cover the whole viewport. */}
    <CartSidebar />
    <WishlistSidebar />
    </>
  );
};

export default Navbar;

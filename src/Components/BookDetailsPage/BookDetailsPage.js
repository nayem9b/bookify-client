import React, { useContext, useState, useEffect } from "react";
import { useLoaderData, Link, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FaShoppingCart, FaHeart, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const priceBadge = (resale, original) => {
  if (!original) return null;
  const discount = Math.round((1 - resale / original) * 100);
  if (discount <= 0) return null;
  return `${discount}% OFF`;
};

const generateDetailedDescription = (book) => {
  if (book.description || book.longDescription) {
    return book.description || book.longDescription;
  }

  // Generate a detailed description from available book data
  const parts = [];

  if (book.title) {
    parts.push(
      `${book.title} is a remarkable literary work that has captivated readers worldwide.`
    );
  }

  if (book.authors) {
    parts.push(
      `Written by ${book.authors}, this book showcases masterful storytelling and compelling narratives.`
    );
  }

  if (book.category) {
    parts.push(
      `This ${book.category} book offers readers unique insights and engaging content.`
    );
  }

  if (book.average_rating && book.ratings_count) {
    parts.push(
      `With an impressive rating of ${
        book.average_rating
      } out of 5 stars from ${book.ratings_count.toLocaleString()} readers, this book has proven to be a favorite among book enthusiasts.`
    );
  }

  if (book.publisher) {
    parts.push(
      `Published by ${book.publisher}, this book maintains the highest standards of quality and presentation.`
    );
  }

  if (book.language_code) {
    parts.push(
      `Available in ${book.language_code.toUpperCase()}, making it accessible to a wide audience.`
    );
  }

  if (book.isbn) {
    parts.push(
      `ISBN: ${book.isbn}. This unique identifier ensures you're getting the authentic version of this beloved title.`
    );
  }

  if (book.original_publication_year) {
    parts.push(
      `Originally published in ${book.original_publication_year}, this book has stood the test of time.`
    );
  }

  if (book.stock !== undefined) {
    const stockStatus =
      book.stock > 10
        ? "readily available"
        : book.stock > 0
        ? "limited copies available"
        : "out of stock";
    parts.push(`Currently ${stockStatus} at an exceptional value price.`);
  }

  if (parts.length === 0) {
    parts.push(
      `${
        book.title || "This book"
      } is a wonderful addition to any collection. Discover why readers love it by adding it to your cart today!`
    );
  }

  return parts.join(" ");
};

export default function BookDetailsPage() {
  const book = useLoaderData() || {};
  const { id } = useParams();
  const { user } = useContext(AuthContext) || {};
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const lastWishlistRef = React.useRef(0);
  const [activeTab, setActiveTab] = useState("description");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      user: "BookLover123",
      text: "Has anyone read this book before?",
      time: "2h",
    },
    {
      id: 2,
      user: "ReaderPro",
      text: "Yes — concise and engaging.",
      time: "1h",
    },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) fetch(`/api/books/${id}`).catch(() => null);
  }, [id]);

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
    toast.success(`${book.title} added to cart!`, {
      position: "top-center",
    });
  };

  // removed unused handleCheckout to avoid linter error

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        user: user?.displayName || "Guest",
        text: message.trim(),
        time: "now",
      },
    ]);
    setMessage("");
  };

  const card = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-white text-slate-900">
      <Link
        to="/"
        className="inline-flex items-center gap-3 text-sm font-medium text-slate-600 hover:text-slate-800"
      >
        <FaArrowLeft aria-hidden />
        <span>Back to catalog</span>
      </Link>

      <motion.article
        initial="hidden"
        animate="show"
        variants={card}
        transition={{ duration: 0.45 }}
        className="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        <motion.div className="md:col-span-4 bg-gradient-to-b from-slate-50 to-white p-6 flex items-center justify-center">
          <motion.img
            src={book.image_url || "/placeholder-book.png"}
            alt={book.name || "Book cover"}
            className="w-full max-w-sm h-auto rounded-xl shadow-2xl object-cover"
            loading="lazy"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        <div className="md:col-span-8 p-6 md:p-10 flex flex-col gap-6">
          <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                {book?.title || "Untitled Bookk"}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                by{" "}
                <span className="font-medium text-slate-700">
                  {book.authors || "Unknown"}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-600">
                  <span className="text-sm">$</span>
                  {book.price ?? "—"}
                </div>
                {book.old_price && (
                  <div className="text-sm text-slate-400 line-through">
                    <span className="text-xs">$</span>
                    {book.old_price}
                  </div>
                )}
                {book.price && (
                  <span className="inline-block mt-2 text-xs font-semibold bg-green-600/90 text-white px-2 py-1 rounded-lg">
                    {priceBadge(book.price, book.old_price)}
                  </span>
                )}
              </div>
            </div>
          </header>

          <section className="flex flex-wrap gap-4 items-center text-sm text-slate-600">
            <Badge label={`Condition: ${book.condition || "Good"}`} />
            <Badge label={`Category: ${book.category || "General"}`} />
            <Badge label={`Seller: ${book.seller || "Marketplace"}`} />
            <Badge label={`Language: ${book.language_code || "English"}`} />
          </section>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
            {/* Primary Action: Add to Cart */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(book);
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center justify-center gap-3 rounded-xl 
             bg-indigo-600 text-white px-6 py-3 font-semibold 
             shadow-lg hover:shadow-xl hover:bg-indigo-700 
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
             transition-all duration-200 ease-out flex-1 sm:flex-initial"
            >
              <FaShoppingCart
                aria-hidden
                className="text-white transition-transform duration-200 group-hover:scale-110"
              />
              <span className="font-medium tracking-wide">Add to Cart</span>

              {/* Subtle glow effect */}
              <motion.span
                layoutId="cart-glow"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>

            {/* Secondary Action: Wishlist */}
            <button
              aria-label="Add to wishlist"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Require user to be signed in
                if (!user) {
                  toast.error("Please sign in to add to wishlist.");
                  return;
                }

                const now = Date.now();
                // rate limit: 2s between requests
                if (now - lastWishlistRef.current < 2000) {
                  toast("You're doing that too fast. Please wait a moment.");
                  return;
                }
                lastWishlistRef.current = now;

                // send patch request to server to add wishlist item to the user's document
                try {
                  setWishlistLoading(true);

                  const API = process.env.REACT_APP_API_URL || "/api";
                  const userId = user?.uid || user?.id || user?.email;
                  if (!userId) {
                    toast.error(
                      "Unable to determine user id. Please sign in again."
                    );
                    setWishlistLoading(false);
                    return;
                  }

                  // include optional auth token if available (some backends expect it)
                  const token = localStorage.getItem("bookify-token");

                  const res = await fetch(
                    `${API}/users/${encodeURIComponent(userId)}/wishlist`,
                    {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                      },
                      body: JSON.stringify({
                        bookId: book._id || id,
                        book,
                      }),
                    }
                  );

                  if (!res.ok) {
                    const errText = await res.text().catch(() => null);
                    throw new Error(
                      errText || `Request failed with ${res.status}`
                    );
                  }

                  // optionally update local UI here (e.g., set a filled heart) if API returns data
                  toast.success("Added to wishlist");
                } catch (err) {
                  console.error("Wishlist error:", err);
                  toast.error("Failed to add to wishlist. Try again later.");
                } finally {
                  // keep small cooldown to avoid accidental double clicks
                  setTimeout(() => setWishlistLoading(false), 600);
                }
              }}
              disabled={wishlistLoading}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-700 font-medium 
             shadow-sm hover:shadow-md hover:border-gray-300 hover:bg-gray-50
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2
             transition-all duration-200 ease-out ${
               wishlistLoading ? "opacity-50 cursor-not-allowed" : ""
             }`}
            >
              <FaHeart
                aria-hidden
                className={`transition-colors duration-200 ${
                  wishlistLoading ? "animate-pulse" : ""
                }`}
              />
              <span className="hidden sm:inline">Add to Wishlist</span>
            </button>
          </div>

          <nav className="flex gap-4 border-b border-slate-100">
            <TabButton
              active={activeTab === "description"}
              onClick={() => setActiveTab("description")}
            >
              Description
            </TabButton>
            <TabButton
              active={activeTab === "community"}
              onClick={() => setActiveTab("community")}
            >
              Community
            </TabButton>
            <TabButton
              active={activeTab === "details"}
              onClick={() => setActiveTab("details")}
            >
              Details
            </TabButton>
          </nav>

          <div className="mt-4">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <h2 className="text-lg font-semibold text-slate-800">
                    About
                  </h2>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {generateDetailedDescription(book)}
                  </p>
                </motion.div>
              )}

              {activeTab === "community" && (
                <motion.div
                  key="comm"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <div className="max-h-60 overflow-y-auto space-y-3">
                    {chatMessages.map((m) => (
                      <Message
                        key={m.id}
                        message={m}
                        me={m.user === (user?.displayName || "Guest")}
                      />
                    ))}
                  </div>

                  <form
                    onSubmit={handleSendMessage}
                    className="mt-4 flex gap-2"
                  >
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Join the conversation"
                      className="flex-1 rounded-lg border border-slate-200 px-4 py-2 focus:ring-2 focus:ring-indigo-300"
                    />
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold"
                    >
                      Send
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {activeTab === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                    <div>
                      <dt className="font-medium text-slate-700">Publisher</dt>
                      <dd>{book.publisher || "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-700">Published</dt>
                      <dd>{book.published_year || "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-700">Rating</dt>
                      <dd>{book.average_rating || "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-700">ISBN</dt>
                      <dd>{book.isbn || "—"}</dd>
                    </div>
                  </dl>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function Badge({ label }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-slate-100 text-slate-700 shadow-sm">
      {label}
    </span>
  );
}

function TabButton({ children, active, onClick }) {
  return (
    <button
      role="tab"
      onClick={onClick}
      className={`py-3 text-sm font-medium ${
        active
          ? "text-indigo-600 border-b-2 border-indigo-600"
          : "text-slate-600 hover:text-slate-800"
      }`}
      aria-selected={active}
    >
      {children}
    </button>
  );
}

function Message({ message, me }) {
  return (
    <div className={`flex gap-3 ${me ? "justify-end" : "justify-start"}`}>
      {!me && (
        <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center text-sm font-semibold text-slate-700">
          {message.user?.charAt(0)?.toUpperCase()}
        </div>
      )}

      <div
        className={`max-w-xl p-3 rounded-2xl ${
          me ? "bg-indigo-600 text-white" : "bg-white text-slate-800"
        } shadow-sm`}
      >
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-1">
          <span className="font-semibold text-sm">{message.user}</span>
          <time className="text-[12px]">{message.time}</time>
        </div>
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>

      {me && (
        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold text-white">
          {message.user?.charAt(0)?.toUpperCase()}
        </div>
      )}
    </div>
  );
}

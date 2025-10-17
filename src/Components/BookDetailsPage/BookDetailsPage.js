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

export default function BookDetailsPage() {
  const book = useLoaderData() || {};
  const { id } = useParams();
  const { user } = useContext(AuthContext) || {};
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
      position: "bottom-right",
    });
  };

  const handleCheckout = () => {
    window.location.href = `/payment?bookId=${book._id || id}`;
  };

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
                {book.name || "Untitled Book"}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                by{" "}
                <span className="font-medium text-slate-700">
                  {book.author || "Unknown"}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-600">
                  ${book.resale_price ?? "—"}
                </div>
                {book.original_price && (
                  <div className="text-sm text-slate-400 line-through">
                    ${book.original_price}
                  </div>
                )}
                {book.original_price && (
                  <span className="inline-block mt-2 text-xs font-semibold bg-green-600/90 text-white px-2 py-1 rounded-lg">
                    {priceBadge(book.resale_price, book.original_price)}
                  </span>
                )}
              </div>
            </div>
          </header>

          <section className="flex flex-wrap gap-4 items-center text-sm text-slate-600">
            <Badge label={`Condition: ${book.condition || "Good"}`} />
            <Badge label={`Category: ${book.category || "General"}`} />
            <Badge label={`Seller: ${book.seller || "Marketplace"}`} />
            <Badge label={`Language: ${book.language || "English"}`} />
          </section>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(book);
              }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              whileHover={{ scale: 1.02 }}
            >
              <FaShoppingCart aria-hidden />
              <span className="font-semibold">Add to Cart</span>
            </motion.button>

            <motion.button
              onClick={handleCheckout}
              className="px-5 py-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 shadow-sm"
              whileHover={{ scale: 1.02 }}
            >
              Buy Now
            </motion.button>

            <button
              aria-label="Add to wishlist"
              className="ml-auto sm:ml-0 p-3 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <FaHeart aria-hidden />
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
                    {book.description || "No description provided."}
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
                      <dd>{book.publishedDate || "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-700">Pages</dt>
                      <dd>{book.pages || "—"}</dd>
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

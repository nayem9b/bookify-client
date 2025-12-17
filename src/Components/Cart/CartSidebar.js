import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaPlus,
  FaMinus,
  FaTrash,
  FaShoppingCart,
  FaLock,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  toggleCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../redux/slices/cartSlice";
import { useAuth } from "../../contexts/AuthContext";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.cart);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const calculateTotal = () => {
    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    setIsConfirmOpen(true);
  };

  const confirmClearCart = () => {
    dispatch(clearCart());
    setIsConfirmOpen(false);
  };

  const cancelClearCart = () => {
    setIsConfirmOpen(false);
  };

  const navigate = useNavigate();

  const { user } = useAuth();

  const handleCheckout = () => {
    if (items.length === 0) return;
    // If not logged in, force login first
    if (!user) {
      // Close the cart sidebar then navigate to login
      dispatch(toggleCart());
      navigate("/signin");
      return;
    }
    // Close the cart sidebar and navigate to payment page
    dispatch(toggleCart());
    navigate("/payment");
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const sidebarVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      x: "100%",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.9,
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      x: -50,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => dispatch(toggleCart())}
          />

          {/* Main Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                <div className="flex items-center space-x-2">
                  {items.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClearCart}
                      className="p-2 text-red-500 hover:text-red-700"
                      title="Clear all items"
                    >
                      <FaTrash size={18} />
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch(toggleCart())}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={20} />
                  </motion.button>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                {items.length} {items.length === 1 ? "item" : "items"} in cart
              </p>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="bg-indigo-50 p-6 rounded-full mb-6">
                    <FaShoppingCart size={48} className="text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add some items to get started
                  </p>
                  <Link to="/books">
                    <button
                      onClick={() => dispatch(toggleCart())}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Browse Products
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-start p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-4">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FaShoppingCart size={24} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-indigo-600 font-semibold mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                          >
                            <FaMinus size={10} />
                          </button>
                          <span className="mx-3 w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                          >
                            <FaPlus size={10} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <FaTimes size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-white">
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="h-px bg-gray-100 my-2"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-indigo-600">${calculateTotal()}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaLock size={14} />
                  <span>Proceed to Checkout</span>
                </button>
                <Link to="/books">
                  <button
                    onClick={() => dispatch(toggleCart())}
                    className="w-full mt-3 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            )}
          </motion.div>

          {/* Confirmation Modal */}
          <AnimatePresence>
            {isConfirmOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-60 bg-black/50 z-60 mr-80"
                onClick={cancelClearCart}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 max-w-sm mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Clear Cart
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to clear your entire cart? This action
                    cannot be undone.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={cancelClearCart}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmClearCart}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;

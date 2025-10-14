import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, removeFromCart, updateQuantity, clearCart } from '../../redux/slices/cartSlice';

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.cart);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log('Proceeding to checkout', items);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => dispatch(toggleCart())}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button 
                onClick={() => dispatch(toggleCart())}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Your cart is empty</p>
                  <button 
                    onClick={() => dispatch(toggleCart())}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item._id} className="flex items-center p-3 border rounded-lg">
                        <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-gray-600">${item.price.toFixed(2)}</p>
                          <div className="flex items-center mt-2">
                            <button 
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              className="p-1 text-gray-500 hover:text-gray-700"
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className="mx-2 w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              className="p-1 text-gray-500 hover:text-gray-700"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-red-500 hover:text-red-700 ml-4"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Subtotal:</span>
                      <span>${calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Shipping:</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>${calculateTotal()}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={() => dispatch(clearCart())}
                      className="w-full mt-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;

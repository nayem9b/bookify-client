import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleWishlist, setWishlist, removeFromWishlist, clearWishlist } from '../../redux/slices/wishlistSlice';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const WishlistSidebar = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.wishlist);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // Variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const sidebarVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { x: '100%', transition: { type: 'spring', damping: 25, stiffness: 300 } },
  };

  useEffect(() => {
    // When opening, fetch wishlist for logged-in user
    const fetchWishlist = async () => {
      if (!isOpen) return;
      if (!user || (!user.id && !user.uid && !user._id)) {
        // no user -> nothing to fetch
        return;
      }
      setLoading(true);
      try {
        const userId = user.uid || user.id || user._id;
        const API = process.env.REACT_APP_API_URL || '/api';
        const res = await fetch(`${API}/users/${encodeURIComponent(userId)}/wishlist`, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          dispatch(setWishlist(data.wishlist || []));
        } else {
          console.warn('Failed to fetch wishlist');
        }
      } catch (err) {
        console.error('Error fetching wishlist:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [isOpen, user, dispatch]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => dispatch(toggleWishlist())}
          />

          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Your Wishlist</h2>
                <p className="text-gray-500 text-sm mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
              </div>
              <button onClick={() => dispatch(toggleWishlist())} className="p-2 text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="flex items-center justify-center h-full">Loading...</div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="bg-indigo-50 p-6 rounded-full mb-6">
                    <FaHeart size={48} className="text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-500 mb-6">Add books you like to your wishlist</p>
                  <Link to="/books" onClick={() => dispatch(toggleWishlist())}>
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Browse Books</button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div key={item.id || item._id || idx} className="flex items-start p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-4 flex items-center justify-center">
                        {/* If item has image_url use it, else show heart icon */}
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <FaHeart className="text-indigo-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.title || item.name || item.id}</h3>
                        {item.author && <p className="text-sm text-gray-500">{item.author}</p>}
                      </div>
                      <button
                        onClick={() => dispatch(removeFromWishlist(item.id || item._id))}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-white">
                <div className="flex justify-between">
                  <button onClick={() => { dispatch(clearWishlist()); }} className="text-red-600">Clear Wishlist</button>
                  <Link to="/wishlist" onClick={() => dispatch(toggleWishlist())} className="text-indigo-600 font-medium">View Full</Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistSidebar;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiHome, 
  FiArrowLeft, 
  FiSearch, 
  FiBook,
  FiCoffee,
  FiClock,
  FiSmile
} from "react-icons/fi";
import Lottie from "lottie-react";
import error from "../../Images/42479-page-not-found-404.json";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Lottie Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <Lottie
              animationData={error}
              loop={true}
              autoplay={true}
              style={{ width: "100%", height: "auto" }}
            />
          </motion.div>

          {/* Error Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                404
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Oops! Page Not Found
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                The page that you are looking for might soon be available if I'm not busy
              </p>
            </div>

            {/* Fun Message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 max-w-md mx-auto"
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <FiCoffee className="w-6 h-6 text-amber-600" />
                <FiClock className="w-6 h-6 text-blue-600" />
                <FiSmile className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-gray-700 font-medium">
                I'm probably working on something amazing! 
                <br />
                <span className="text-sm text-gray-500">Check back later or explore our other pages.</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FiHome className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Go Home</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group flex items-center space-x-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FiArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Go Back</span>
            </button>

            <Link
              to="/books"
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FiBook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Browse Books</span>
            </Link>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="pt-8 border-t border-gray-200"
          >
            <p className="text-gray-500 mb-4">Need help? Try these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Categories", path: "/categories", icon: <FiSearch className="w-4 h-4" /> },
                { name: "New Releases", path: "/new-releases", icon: <FiBook className="w-4 h-4" /> },
                { name: "Best Sellers", path: "/bestsellers", icon: <FiBook className="w-4 h-4" /> },
                { name: "Free Books", path: "/free-books", icon: <FiBook className="w-4 h-4" /> },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="pt-8"
          >
            <p className="text-sm text-gray-400">
              Error 404 • Page Not Found • 
              <span className="ml-1 text-indigo-500 font-medium">Bookify</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;

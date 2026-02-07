import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/UserContext";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiBookOpen,
  FiUserPlus,
  FiUser,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const SignIn = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;
      const currentUser = { email: user.email };

      const response = await fetch(
        "https://server-side-nayem9b.vercel.app/jwt",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(currentUser),
        }
      );

      const data = await response.json();
      localStorage.setItem("jwt-token", data.token);
      navigate(from, { replace: true });
      toast.success("Successfully signed in with Google!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in with Google");
    }
  };

  // Email Login
  const handleEmailLogin = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;

      const API_BASE = process.env.REACT_APP_API_URL || "/api";
      const res = await fetch(`${API_BASE}/users/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Invalid credentials");
      }

      const data = await res.json();
      // data should include { token, user }
      if (data.token) {
        localStorage.setItem("jwt-token", data.token);
      }
      navigate(from, { replace: true });
      toast.success("Successfully signed in!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.message ||
          "Failed to sign in. Please check your credentials and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto mt-16 "
        initial="hidden"
        animate={isMounted ? "show" : "hidden"}
        variants={container}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-[85vh] gap-8 lg:gap-16">
          {/* Left side - Modern Information Panel */}
          <motion.div
            className="hidden lg:flex flex-1 max-w-xl xl:max-w-2xl"
            variants={item}
          >
            <div className="w-full h-full p-8">
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-slate-700 via-blue-800 to-indigo-900 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                  ></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center h-full p-12 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                        <FiBookOpen className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl font-bold">Bookify</span>
                    </div>
                    <h2 className="text-5xl font-bold mb-6 leading-tight">
                      Welcome Back
                    </h2>
                    <p className="text-xl text-white/90 leading-relaxed max-w-md">
                      Continue your reading journey with thousands of books at your fingertips.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-6 mb-12"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <FiBookOpen className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg mb-1">Unlimited Access</h3>
                        <p className="text-white/80">Browse our extensive library of books</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <FiUser className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg mb-1">Personalized</h3>
                        <p className="text-white/80">Get recommendations tailored to your taste</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <FiLock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg mb-1">Secure & Private</h3>
                        <p className="text-white/80">Your reading data is always protected</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-auto pt-8 border-t border-white/20"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 flex items-center justify-center text-xs font-semibold text-white"
                          >
                            {String.fromCharCode(65 + i)}
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-sm text-white/80">
                          Join <span className="font-semibold text-white">50,000+</span> readers worldwide
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border-0"
            variants={item}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-800 h-2"></div>
              <div className="p-8 sm:p-10">
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <motion.div
                      className="hover:scale-110 transition-transform duration-200"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiBookOpen className="text-4xl bg-gradient-to-br from-slate-800 to-blue-900 bg-clip-text text-transparent" />
                    </motion.div>
                    <span className="text-3xl font-extrabold bg-gradient-to-br from-slate-800 to-blue-900 bg-clip-text text-transparent ml-2">
                      Bookify
                    </span>
                  </div>
                  {/* <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                  <p className="text-gray-500">Sign in to continue your reading journey</p> */}
                </motion.div>

                <form onSubmit={handleEmailLogin} className="space-y-6">
                  <motion.div className="space-y-2" variants={item}>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-indigo-500" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 placeholder-gray-400 text-gray-700 shadow-sm"
                        placeholder="you@example.com"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div className="space-y-2" variants={item}>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="text-sm">
                        <Link
                          to="/forgot-password"
                          className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-indigo-500" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 placeholder-gray-400 text-gray-700 shadow-sm"
                        placeholder="••••••••"
                      />
                      <motion.button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPassword ? (
                          <FiEyeOff className="h-5 w-5" />
                        ) : (
                          <FiEye className="h-5 w-5" />
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  <motion.div className="pt-2" variants={item}>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-br from-slate-800 to-blue-900 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md ${
                        isSubmitting
                          ? "opacity-80 cursor-not-allowed"
                          : "hover:shadow-lg"
                      }`}
                      whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Signing in...
                        </div>
                      ) : (
                        <span>Sign in to your account</span>
                      )}
                    </motion.button>
                  </motion.div>
                </form>

                <motion.div className="mt-8" variants={item}>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white text-sm text-gray-500 font-medium">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <motion.div
                    className="mt-6"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <button
                      onClick={handleGoogleLogin}
                      className="w-full flex items-center justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100 transition-all duration-200 hover:shadow-md"
                    >
                      <FcGoogle className="h-5 w-5 mr-2" />
                      Sign in with Google
                    </button>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mt-8 text-center text-sm"
                  variants={item}
                >
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-colors duration-200"
                    >
                      <FiUserPlus className="inline mr-1" /> Create an account
                    </Link>
                  </p>

                  <motion.div
                    className="mt-6"
                    whileHover={{ x: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to="/"
                      className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors duration-200"
                    >
                      <FiArrowLeft className="mr-1" /> Back to home
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;

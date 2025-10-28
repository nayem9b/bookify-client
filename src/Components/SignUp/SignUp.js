import { getAuth, updateProfile } from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/UserContext";
import useTitle from "../Hooks/UseTitle";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiUpload,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: { opacity: 0, scale: 0.95 },
};
const SignUp = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { googleSignIn, userSignUp } = useContext(AuthContext);

  // State
  // default role should match the option values ('buyer' or 'seller')
  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const from = location.state?.from?.pathname || "/";

  // Set document title
  useTitle("Sign Up - Bookify");

  // Generate preview for selected image
  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    // Free memory when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  // Handle Google Sign In
  // Accept event so we can prevent default if this is triggered from a form/button
  const handleGoogleSignIn = async (event) => {
    if (event && typeof event.preventDefault === "function")
      event.preventDefault();
    try {
      const result = await googleSignIn();
      const user = result?.user;

      // Build payload using available form state and Google user info
      const userInfo = {
        name: user?.displayName || "",
        email: user?.email || "",
        role: role || "buyer",
        signedBy: "google",
        password : "sdjfoshdfohasdnkjalsndn"
      };
    
      // Save user info to backend
      await fetch(`http://localhost:5000/api/users/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      navigate(from, { replace: true });
      toast.success("Successfully signed in with Google!");
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error(error?.message || "Failed to sign in with Google");
    }
  };

  // Handle form submission
  const handleSignUp = async (event) => {
    event.preventDefault();
    const form = event.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.passwordConfirmation.value;

    // Reset states
    setIsLoading(true);
    // Validation
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      setIsLoading(false);
      return;
    }
    console.log(password);
    try {
      // Create user account
      const userCredential = await userSignUp(email, password);
      const user = userCredential?.user;

      // Update user profile - use the returned user object instead of auth.currentUser
      // because auth.currentUser can be null immediately after creation.
      if (user) {
        await updateProfile(user, {
          displayName: fullName,
        });
      }
      
      // Save additional user info to database
      const userInfo = {
        name: fullName,
        email: email,
        role: role,
        password: password,
        guid: user?.uid,
      };

      await fetch(`http://localhost:5000/api/users/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      // Success!
      toast.success("Account created successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      // Handle firebase errors gracefully
      console.error("Sign up error:", error);

      // Default message
      let message = error?.message || "Failed to create account";

      // Firebase auth errors sometimes include codes
      const code = error?.code || "";

      if (
        code === "auth/email-already-in-use" ||
        message.includes("email-already-in-use")
      ) {
        // Friendly toast and redirect option
        toast.error(
          "This email is already registered. Please sign in or use a different email."
        );
        // Optionally redirect to sign in page after short delay
        setTimeout(() => navigate("/signin"), 1500);
      } else if (
        code === "auth/invalid-email" ||
        message.toLowerCase().includes("invalid-email")
      ) {
        toast.error("Please provide a valid email address.");
      } else if (
        code === "auth/weak-password" ||
        message.toLowerCase().includes("weak-password")
      ) {
        toast.error("Password is too weak. Use at least 6 characters.");
      } else {
        // Generic fallback
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Handle image selection
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4 md:p-8">
      <div className="relative w-full max-w-5xl mt-16">
        {/* Back button */}
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -4 }}
          className="absolute -top-16 left-0 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
        >
          <FiArrowLeft className="mr-1" /> Back to home
        </motion.button>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Left side - Illustration */}
          <div className="hidden lg:flex bg-gradient-to-br from-indigo-600 to-purple-600 p-12 flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Join Our Community
              </h2>
              <p className="text-indigo-100 text-lg mb-8">
                Create your account and discover a world of books. Join
                thousands of readers and sellers today!
              </p>

              <div className="space-y-4">
                {[
                  { icon: "", text: "Discover thousands of books" },
                  { icon: "", text: "Fast and secure checkout" },
                  { icon: "", text: "Exclusive member benefits" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center text-indigo-100"
                  >
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="p-8 md:p-12"
          >
            <div className="text-center lg:text-left mb-8">
              <motion.h1
                className="text-3xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Create Account
              </motion.h1>
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Join Bookify and start your reading journey
              </motion.p>
            </div>

            {/* Role Selection */}
            <motion.div className="mb-6" variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Join as a
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["buyer", "seller"].map((userRole) => (
                  <motion.div
                    key={userRole}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer rounded-xl p-4 text-center transition-all ${
                      role === userRole
                        ? "bg-indigo-50 border-2 border-indigo-500"
                        : "bg-gray-50 border-2 border-transparent hover:border-gray-200"
                    }`}
                    onClick={() => setRole(userRole)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 absolute top-2 right-2 ${
                        role === userRole
                          ? "bg-indigo-500 border-indigo-500"
                          : "border-gray-300"
                      }`}
                    >
                      {role === userRole && (
                        <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </div>
                    <div className="text-3xl mb-2">
                      {userRole === "buyer" ? "📖" : "🏪"}
                    </div>
                    <div className="font-medium text-gray-900">{userRole}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {userRole === "buyer"
                        ? "Browse and buy books"
                        : "Sell your books"}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <form onSubmit={handleSignUp}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-5"
              >
                {/* Profile Picture Upload */}
                {/* <motion.div variants={itemVariants} className='flex flex-col items-center'>
                  <label className='block text-sm font-medium text-gray-700 mb-2 self-start'>
                    Profile Picture
                    <span className='text-red-500 ml-1'>*</span>
                  </label>
                  <div className='relative group'>
                    <div className='w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden'>
                      {preview ? (
                        <img 
                          src={preview} 
                          alt='Preview' 
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <FiUser className='h-10 w-10 text-gray-400' />
                      )}
                    </div>
                    <label 
                      htmlFor='image-upload'
                      className='absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors shadow-lg'
                    >
                      <FiUpload className='h-4 w-4' />
                      <input
                        id='image-upload'
                        name='image'
                        type='file'
                        accept='image/*'
                        onChange={onSelectFile}
                        required
                        className='hidden'
                      />
                    </label>
                  </div>
                </motion.div> */}

                {/* Full Name */}
                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Full Name"
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Email Address"
                  />
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength="6"
                    className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Password (min 6 characters)"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </motion.div>

                {/* Confirm Password */}
                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength="6"
                    className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
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
                        Creating Account...
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </motion.div>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div
              className="my-6 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-sm text-gray-500">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </motion.div>

            {/* Google Sign In */}
            <motion.div
              // initial={{ opacity: 0, y: 20 }}
              // animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button
                type="button"
                onClick={(e) => handleGoogleSignIn(e)}
                className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <FcGoogle className="h-5 w-5 mr-2" />
                Sign up with Google
              </button>
            </motion.div>

            {/* Login Link */}
            <motion.div
              className="mt-6 text-center text-sm text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Sign in
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default SignUp;

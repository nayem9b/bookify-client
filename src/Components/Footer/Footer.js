import React from "react";
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-[#5865F2] text-white overflow-hidden">
      {/* Ultra wide Bookify text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <h1 className="text-[35vh] font-black tracking-tighter transform scale-150 select-none whitespace-nowrap">
          BOOKIFY
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Product Column */}
          <div>
            <h3 className="text-lg font-bold mb-6">Product</h3>
            <ul className="space-y-4">
              <li><a href="/" className="hover:underline">Download</a></li>
              <li><a href="/" className="hover:underline">Premium Books</a></li>
              <li><a href="/" className="hover:underline">Book Store</a></li>
              <li><a href="/" className="hover:underline">Categories</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="/" className="hover:underline">About</a></li>
              <li><a href="/" className="hover:underline">Jobs</a></li>
              <li><a href="/" className="hover:underline">Brand</a></li>
              <li><a href="/" className="hover:underline">Blog</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-bold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><a href="/" className="hover:underline">Support</a></li>
              <li><a href="/" className="hover:underline">Safety</a></li>
              <li><a href="/" className="hover:underline">Community</a></li>
              <li><a href="/" className="hover:underline">Developers</a></li>
            </ul>
          </div>

          {/* Policies Column */}
          <div>
            <h3 className="text-lg font-bold mb-6">Policies</h3>
            <ul className="space-y-4">
              <li><a href="/" className="hover:underline">Terms</a></li>
              <li><a href="/" className="hover:underline">Privacy</a></li>
              <li><a href="/" className="hover:underline">Guidelines</a></li>
              <li><a href="/" className="hover:underline">Acknowledgements</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#ffffff33] w-full mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo */}
          <div className="text-2xl font-bold">
            Bookify
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <FaTwitter size={24} />
            </a>
            <a href="/" className="hover:opacity-80 transition-opacity">
              <FaInstagram size={24} />
            </a>
            <a href="/" className="hover:opacity-80 transition-opacity">
              <FaFacebook size={24} />
            </a>
            <a href="/" className="hover:opacity-80 transition-opacity">
              <FaYoutube size={24} />
            </a>
            <a href="/" className="hover:opacity-80 transition-opacity">
              <FaTiktok size={24} />
            </a>
          </div>

          {/* Sign Up Button */}
          <button className="bg-white text-[#5865F2] px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors">
            Sign Up
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;



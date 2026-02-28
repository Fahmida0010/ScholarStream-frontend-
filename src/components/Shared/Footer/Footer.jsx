import React from 'react';
import { FaXTwitter, FaYoutube, FaFacebookF } from "react-icons/fa6";
import Logo from '../../Logo/Logo';

const Footer = () => {
  return (
    <footer className="bg-amber-200 pt-10 pb-6 px-6">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left items-start">
        
        {/* Logo & About */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <Logo />
          <p className="font-semibold text-sm leading-snug max-w-xs">
            A scholarship isn’t just financial support, it’s a recognition of your hard work, potential, and the bright future you’re destined to create.
          </p>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-bold text-lg mb-2">Newsletter</h3>
          <p className="text-sm">Subscribe to receive the latest updates and scholarship news.</p>
          <form className="flex flex-col sm:flex-row gap-2 mt-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none flex-1"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2 p-4">
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <a href="/" className="hover:text-gray-800 hover:underline transition">Home</a>
          <a href="/all-scholarships" className="hover:text-gray-800 hover:underline transition">Scholarships</a>
          <a href="/blog" className="hover:text-gray-800 hover:underline transition">Blog</a>
          <a href="/contact" className="hover:text-gray-800 hover:underline transition">Contact</a>
        </div>

        {/* Terms & Social */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-lg mb-2">Terms & Social</h3>
          <a href="/terms-conditions" 
          className="hover:text-gray-800 hover:underline
           transition">Terms & Conditions</a>
          <a href="/privacy-policy" className="hover:text-gray-800
           hover:underline transition">Privacy Policy</a>
          <a href="/support" className="hover:text-gray-800
           hover:underline transition">Help & Support</a>
             <a href="/contact" className="hover:text-gray-800
           hover:underline transition">Contact</a>

          <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
            <a
              href="https://x.com/fahmida105623"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-gray-400 p-2 rounded-full transition"
            >
              <FaXTwitter className="w-5 h-5 text-black" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCW_QSH-znO-5qn6q9r7dHFA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-red-600 hover:text-white p-2 rounded-full transition"
            >
              <FaYoutube className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/nihsanga.cetana"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-blue-600 hover:text-white p-2 rounded-full transition"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-xs text-gray-700">
        © {new Date().getFullYear()} ScholarStream. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
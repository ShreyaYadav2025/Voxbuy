'use client';
import Link from 'next/link';
import React from 'react';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">VOXBUY</Link>
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/" className="text-gray-800 hover:text-gray-600">Home</Link></li>
          <li><Link href="/browseproduct" className="text-gray-800 hover:text-gray-600">Products</Link></li>
          <li><Link href="/about" className="text-gray-800 hover:text-gray-600">About</Link></li>
          <li><Link href="/contact" className="text-gray-800 hover:text-gray-600">Contact</Link></li>
          <li><Link href="/feedback" className="text-gray-800 hover:text-gray-600">Feedback</Link></li>
        </ul>

        <div className="flex items-center space-x-4">
          <Link 
            href="/cart" 
            className="relative text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </span>
          </Link>
          <Link href="/login" className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Login</Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown (hidden by default) */}
      <div className="hidden md:hidden">
        <ul className="px-4 pt-2 pb-3 space-y-1">
          <li><Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link></li>
          <li><Link href="/browseproduct" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Products</Link></li>
          <li><Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About</Link></li>
          <li><Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact</Link></li>
          <li><Link href="/feedback" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Feedback</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
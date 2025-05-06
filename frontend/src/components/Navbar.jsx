'use client';
import Link from 'next/link';
import React from 'react';
import { useCart } from '@/context/CartContext';
import { FaCartShopping } from 'react-icons/fa6';

const Navbar = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="bg-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        
        <Link href="/" className="text-2xl font-bold text-white">VOXBUY</Link>
        
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/" className="text-white hover:text-rose-300">Home</Link></li>
          <li><Link href="/browseproduct" className="text-white hover:text-rose-300">Products</Link></li>
          <li><Link href="/about" className="text-white hover:text-rose-300">About</Link></li>
          <li><Link href="/contact" className="text-white hover:text-rose-300">Contact</Link></li>
          <li><Link href="/feedback" className="text-white hover:text-rose-300">Feedback</Link></li>
        </ul>

        <div className="flex items-center space-x-4">
          <Link 
            href="/cart" 
            className="relative text-white bg-rose-700 px-4 py-2 rounded-lg hover:bg-rose-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <FaCartShopping className="text-xl" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </span>
          </Link>
          <Link href="/login" className="text-white bg-rose-700 px-4 py-2 rounded-lg hover:bg-rose-800 transition-colors">Login</Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-lg text-white hover:bg-gray-900">
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
        <ul className="px-4 pt-2 pb-3 space-y-1 bg-gray-900">
          <li><Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-rose-300 hover:bg-gray-800">Home</Link></li>
          <li><Link href="/browseproduct" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-rose-300 hover:bg-gray-800">Products</Link></li>
          <li><Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-rose-300 hover:bg-gray-800">About</Link></li>
          <li><Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-rose-300 hover:bg-gray-800">Contact</Link></li>
          <li><Link href="/feedback" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-rose-300 hover:bg-gray-800">Feedback</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
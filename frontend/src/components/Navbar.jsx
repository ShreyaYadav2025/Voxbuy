'use client';
import Link from 'next/link';
import React from 'react';
import { useCart } from '@/context/CartContext';
import { FaCartShopping } from 'react-icons/fa6';

const Navbar = () => {
  const { getCartCount, isLoaded } = useCart();
  const cartCount = isLoaded ? getCartCount() : 0;

  const isLoggedin = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
  const userName = isLoggedin ? localStorage.getItem('userName') : '';

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold text-white hover:text-rose-400 transition-colors duration-300">
          VOX<span className="text-rose-500">BUY</span>
        </Link>

        <ul className="hidden md:flex space-x-8">
          <li><Link href="/" className="text-lg font-medium text-white hover:text-rose-400 transition-all duration-300 hover:scale-110 inline-block">Home</Link></li>
          <li><Link href="/browseproduct" className="text-lg font-medium text-white hover:text-rose-400 transition-all duration-300 hover:scale-110 inline-block">Products</Link></li>
          <li><Link href="/about" className="text-lg font-medium text-white hover:text-rose-400 transition-all duration-300 hover:scale-110 inline-block">About</Link></li>
          <li><Link href="/contact" className="text-lg font-medium text-white hover:text-rose-400 transition-all duration-300 hover:scale-110 inline-block">Contact</Link></li>
          <li><Link href="/feedback" className="text-lg font-medium text-white hover:text-rose-400 transition-all duration-300 hover:scale-110 inline-block">Feedback</Link></li>
        </ul>

        <div className="flex items-center space-x-6">

          <Link
            href="/cart"
            className="relative text-white bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 rounded-lg hover:from-rose-700 hover:to-rose-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span className="flex items-center gap-3 text-lg font-medium">
              <FaCartShopping className="text-2xl" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </span>
          </Link>
          <Link
            href="/login"
            className="text-lg font-medium text-white bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 rounded-lg hover:from-rose-700 hover:to-rose-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-lg font-medium text-white bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 rounded-lg hover:from-rose-700 hover:to-rose-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Signup
          </Link>

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
      </div >

      {/* Mobile menu dropdown (hidden by default) */}
      < div className="hidden md:hidden" >
        <ul className="px-4 pt-2 pb-3 space-y-1 bg-gray-900">
          <li><Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-rose-300 hover:bg-gray-800">Home</Link></li>
          <li><Link href="/browseproduct" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-rose-300 hover:bg-gray-800">Products</Link></li>
          <li><Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-rose-300 hover:bg-gray-800">About</Link></li>
          <li><Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-rose-300 hover:bg-gray-800">Contact</Link></li>
          <li><Link href="/feedback" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-rose-300 hover:bg-gray-800">Feedback</Link></li>
        </ul>
      </div >
    </nav >
  );
};

export default Navbar;
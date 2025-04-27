import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">Voxbuy</div>
        <ul className="flex space-x-6">
          <li><a href="/" className="text-gray-600 hover:text-gray-800">Home</a></li>
          <li><a href="/products" className="text-gray-600 hover:text-gray-800">Products</a></li>
          <li><a href="/about" className="text-gray-600 hover:text-gray-800">About</a></li>
          <li><a href="/contact" className="text-gray-600 hover:text-gray-800">Contact</a></li>
        </ul>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="text-white bg-blue-700 px-4 py-2 rounded-lg hover:text-gray-300">Cart</Link>
          <Link href="/login" className="text-white bg-blue-700 px-4 py-2 rounded-lg hover:text-gray-300">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
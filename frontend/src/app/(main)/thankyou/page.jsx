"use client";
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Thank You!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Your order has been successfully placed. We'll send you a confirmation email with your order details shortly.
        </p>
        
        <div className="text-sm text-gray-500 mb-8">
          <p>Order Reference: #REF{Math.random().toString(36).substr(2, 9)}</p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/cart" 
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
          >
            View My Orders
          </Link>
          
          <Link 
            href="/browseproduct" 
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;
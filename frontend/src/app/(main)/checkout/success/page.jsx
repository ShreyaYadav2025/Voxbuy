'use client';
import Link from 'next/link';
import React from 'react';

const CheckoutSuccess = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your order. We have received your purchase and will begin processing it right away.
          You will receive an email confirmation shortly.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/browseproduct"
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
          
          <Link
            href="/orders"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
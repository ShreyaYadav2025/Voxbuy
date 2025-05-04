import React from 'react';
import Link from 'next/link';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-600 to-blue-700">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              VOXBUY
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-100">
              Your premier destination for quality fashion and lifestyle products
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white"></div>
      </div>

      {/* Mission Section */}
      <div className=" bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-800 mb-4">
              At Voxbuy, we're committed to providing an exceptional online shopping experience that combines quality, style, and convenience. Our mission is to make fashion accessible to everyone while maintaining high standards of product quality and customer service.
            </p>
            <p className="text-lg text-gray-800">
              We believe that shopping should be an enjoyable journey of discovery, where you can find exactly what you're looking for and perhaps something unexpected that delights you.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <img
              src="/image.jpg"
              alt="Voxbuy Mission"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className=" bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Voxbuy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Products</h3>
              <p className="text-gray-600">Carefully curated selection of high-quality fashion items and accessories from trusted brands and manufacturers.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">Best value for your money with competitive prices and regular deals and discounts on our products.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Shopping</h3>
              <p className="text-gray-600">User-friendly interface with advanced filters and search options to help you find exactly what you're looking for.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className=" bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer First</h3>
            <p className="text-gray-600">
              We prioritize customer satisfaction above all else. Our dedicated support team is always ready to assist you with any questions or concerns.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Assurance</h3>
            <p className="text-gray-600">
              Every product on our platform goes through rigorous quality checks to ensure you receive only the best.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparency</h3>
            <p className="text-gray-600">
              We believe in being transparent about our products, pricing, and policies. What you see is what you get.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
            <p className="text-gray-600">
              We continuously improve our platform and services to provide you with the best online shopping experience.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Start Shopping Today
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of satisfied customers who trust Voxbuy for their fashion needs.
            </p>
            <Link 
              href="/browseproduct"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
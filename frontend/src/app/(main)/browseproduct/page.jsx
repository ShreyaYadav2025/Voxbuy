'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const BrowseProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product/getall');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && 
      (priceRange.max === 0 || product.price <= priceRange.max)
    );

    // Sort by price
    filtered.sort((a, b) => a.price - b.price);

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, priceRange, searchTerm]);

  const handleAddToCart = (product) => {
    const defaultSize = product.size[0] || null;
    const defaultColor = product.color[0] || null;
    addToCart(product, defaultSize, defaultColor, 1);
  };

  return (
    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 min-h-screen">
      {/* Hero Header Section */}
      <div
        className="relative mb-12 w-full"
        style={{
          minHeight: '320px',
          backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/004/707/493/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg'), linear-gradient(to right, #4b5563cc, #4338ca99)",
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '0px',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30 lg:rounded-none"></div>
        <div className="relative px-4 md:px-8 py-12 text-center max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Discover Our Collection
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto drop-shadow">
            Explore our carefully curated selection of premium products
          </p>
          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            <button
              onClick={() => setSelectedCategory('men')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === 'men'
                  ? 'bg-white text-blue-600'
                  : 'bg-blue-700 text-white hover:bg-blue-800'
              }`}
            >
              Men's Fashion
            </button>
            <button
              onClick={() => setSelectedCategory('women')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === 'women'
                  ? 'bg-white text-blue-600'
                  : 'bg-blue-700 text-white hover:bg-blue-800'
              }`}
            >
              Women's Fashion
            </button>
            <button
              onClick={() => setSelectedCategory('kids')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === 'kids'
                  ? 'bg-white text-blue-600'
                  : 'bg-blue-700 text-white hover:bg-blue-800'
              }`}
            >
              Kids Collection
            </button>
            <button
              onClick={() => setSelectedCategory('accessories')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === 'accessories'
                  ? 'bg-white text-blue-600'
                  : 'bg-blue-700 text-white hover:bg-blue-800'
              }`}
            >
              Accessories
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Grid Container */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
            
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange({ min: 0, max: 1000000 });
                setSearchTerm('');
              }}
              className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Link href={`/view-product/${product._id}`}>
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {product.image && product.image.length > 0 ? (
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    
                    {/* Stock Badge */}
                    {product.stock <= 5 && (
                      <span className={`absolute top-2 right-2 px-2 py-1 rounded-md text-sm font-medium ${
                        product.stock === 0 
                          ? 'bg-red-500 text-white' 
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {product.stock === 0 ? 'Out of Stock' : `Only ${product.stock} left`}
                      </span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    
                    {/* Price */}
                    <div className="text-xl font-bold text-blue-600 mb-3">
                      ${product.price.toFixed(2)}
                    </div>

                    {/* Product Options */}
                    <div className="space-y-2">
                      {/* Size Options */}
                      {product.size && product.size.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {product.size.map((size) => (
                            <span key={size} className="px-2 py-1 text-xs bg-gray-100 rounded-md">
                              {size}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Color Options */}
                      {product.color && product.color.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {product.color.map((color) => (
                            <span key={color} className="px-2 py-1 text-xs bg-gray-100 rounded-md">
                              {color}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Add to Cart Button */}
                <div className="px-4 pb-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`w-full py-2 rounded-md transition-colors duration-200 ${
                      product.stock === 0
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white font-semibold'
                    }`}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or browse our other categories</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange({ min: 0, max: 1000000 });
                  setSearchTerm('');
                }}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseProduct;
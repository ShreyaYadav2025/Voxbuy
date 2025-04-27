'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BrowseProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product/getall');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (selectedSize !== 'all') {
      filtered = filtered.filter(product => product.size.includes(selectedSize));
    }

    if (selectedColor !== 'all') {
      filtered = filtered.filter(product => product.color.includes(selectedColor));
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedSize, selectedColor, priceRange]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters Section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
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

        {/* Size Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Sizes</option>
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        {/* Color Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Colors</option>
            {['Red', 'Blue', 'Green', 'Black', 'White'].map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Image Carousel */}
            <div className="relative h-64 overflow-hidden">
              {product.image && product.image.length > 0 && (
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
              {product.stock <= 5 && product.stock > 0 && (
                <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm">
                  Only {product.stock} left
                </span>
              )}
              {product.stock === 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              
              {/* Price */}
              <div className="text-xl font-bold text-blue-600 mb-2">
                ${product.price.toFixed(2)}
              </div>

              {/* Size and Color Options */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {product.size.map((size) => (
                    <span key={size} className="px-2 py-1 text-sm bg-gray-100 rounded-md">
                      {size}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.color.map((color) => (
                    <span key={color} className="px-2 py-1 text-sm bg-gray-100 rounded-md">
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                disabled={product.stock === 0}
                className={`w-full py-2 rounded-md ${
                  product.stock === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-semibold transition-colors duration-200`}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Products Found */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default BrowseProduct;
// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import { useCart } from '@/context/CartContext';

// const BrowseProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedSize, setSelectedSize] = useState('all');
//   const [selectedColor, setSelectedColor] = useState('all');
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const { addToCart } = useCart();

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/product/getall');
//       setProducts(response.data);
//       setFilteredProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const filterProducts = () => {
//     let filtered = [...products];

//     // Category filter
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());
//     }

//     // Search filter
//     if (searchTerm.trim() !== '') {
//       filtered = filtered.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//     }

//     // Price range filter
//     filtered = filtered.filter(product =>
//       product.price >= priceRange.min &&
//       (priceRange.max === 0 || product.price <= priceRange.max)
//     );

//     // Sort by price
//     filtered.sort((a, b) => a.price - b.price);

//     setFilteredProducts(filtered);
//   };

//   useEffect(() => {
//     filterProducts();
//   }, [selectedCategory, priceRange, searchTerm]);

//   const handleAddToCart = (product) => {
//     const defaultSize = product.size[0] || null;
//     const defaultColor = product.color[0] || null;
//     addToCart(product, defaultSize, defaultColor, 1);
//   };

//   const toggleFilters = () => {
//     setIsFilterOpen(!isFilterOpen);
//   };

//   return (
//     <div className="bg-black text-gray-100 min-h-screen">
//       {/* Hero Header Section */}
//       <div
//         className="relative mb-8 w-full"
//         style={{
//           minHeight: '320px',
//           backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/004/707/493/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg'), linear-gradient(to right,rgba(0, 0, 0, 0.8),rgba(193, 12, 57, 0.8))",
//           backgroundBlendMode: 'overlay',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute inset-0 bg-black opacity-60"></div>
//         <div className="relative px-4 md:px-8 py-12 text-center max-w-7xl mx-auto">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
//             Discover Our Collection
//           </h1>
//           <p className="text-rose-200 text-lg mb-8 max-w-2xl mx-auto drop-shadow">
//             Explore our carefully curated selection of premium products
//           </p>
//           {/* Search Bar */}
//           <div className="flex justify-center mb-6">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//               className="w-full max-w-md px-4 py-2 rounded-full border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
//             />
//           </div>
//           <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
//             <button
//               onClick={() => setSelectedCategory('men')}
//               className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === 'men'
//                   ? 'bg-rose-700 text-white'
//                   : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
//                 }`}
//             >
//               Men's Fashion
//             </button>
//             <button
//               onClick={() => setSelectedCategory('women')}
//               className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === 'women'
//                   ? 'bg-rose-700 text-white'
//                   : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
//                 }`}
//             >
//               Women's Fashion
//             </button>
//             <button
//               onClick={() => setSelectedCategory('kids')}
//               className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === 'kids'
//                   ? 'bg-rose-700 text-white'
//                   : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
//                 }`}
//             >
//               Kids Collection
//             </button>
//             <button
//               onClick={() => setSelectedCategory('accessories')}
//               className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === 'accessories'
//                   ? 'bg-rose-700 text-white'
//                   : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
//                 }`}
//             >
//               Accessories
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Content Container */}
//       <div className="container mx-auto px-4 pb-12">
//         {/* Mobile Filter Toggle */}
//         <div className="lg:hidden mb-4">
//           <button
//             onClick={toggleFilters}
//             className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2"
//           >
//             <span>{isFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//           </button>
//         </div>

//         {/* Horizontal Filters (Desktop) */}
//         <div className="hidden lg:block mb-8">
//           <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
//             <div className="flex flex-wrap items-center gap-6">
//               {/* Category Filter */}
//               <div className="flex-1 min-w-[200px]">
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-rose-500 focus:ring-rose-500"
//                 >
//                   <option value="all">All Categories</option>
//                   <option value="electronics">Electronics</option>
//                   <option value="clothing">Clothing</option>
//                   <option value="books">Books</option>
//                   <option value="accessories">Accessories</option>
//                 </select>
//               </div>

//               {/* Price Range Filter */}
//               <div className="flex-1 min-w-[200px]">
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
//                 <div className="flex gap-2">
//                   <input
//                     type="number"
//                     placeholder="Min"
//                     value={priceRange.min}
//                     onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
//                     className="w-1/2 rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-rose-500 focus:ring-rose-500"
//                     min="0"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Max"
//                     value={priceRange.max}
//                     onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
//                     className="w-1/2 rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-rose-500 focus:ring-rose-500"
//                     min="0"
//                   />
//                 </div>
//               </div>

//               {/* Reset Filters */}
//               <div className="flex items-end">
//                 <button
//                   onClick={() => {
//                     setSelectedCategory('all');
//                     setPriceRange({ min: 0, max: 1000000 });
//                     setSearchTerm('');
//                   }}
//                   className="px-6 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 transition-colors"
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Filters (Collapsible) */}
//         {isFilterOpen && (
//           <div className="lg:hidden mb-6">
//             <div className="bg-gray-900 p-4 rounded-xl shadow-lg">
//               <div className="space-y-4">
//                 {/* Category Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
//                   <select
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     className="w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-rose-500 focus:ring-rose-500"
//                   >
//                     <option value="all">All Categories</option>
//                     <option value="electronics">Electronics</option>
//                     <option value="clothing">Clothing</option>
//                     <option value="books">Books</option>
//                     <option value="accessories">Accessories</option>
//                   </select>
//                 </div>

//                 {/* Price Range Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
//                   <div className="flex gap-2">
//                     <input
//                       type="number"
//                       placeholder="Min"
//                       value={priceRange.min}
//                       onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
//                       className="w-1/2 rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-rose-500 focus:ring-rose-500"
//                       min="0"
//                     />
//                     <input
//                       type="number"
//                       placeholder="Max"
//                       value={priceRange.max}
//                       onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
//                       className="w-1/2 rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-rose-500 focus:ring-rose-500"
//                       min="0"
//                     />
//                   </div>
//                 </div>

//                 {/* Reset Filters */}
//                 <button
//                   onClick={() => {
//                     setSelectedCategory('all');
//                     setPriceRange({ min: 0, max: 1000000 });
//                     setSearchTerm('');
//                   }}
//                   className="w-full mt-4 px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 transition-colors"
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Results Count */}
//         <div className="mb-6">
//           <p className="text-gray-400">
//             Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
//           </p>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredProducts.map((product) => (
//             <div key={product._id} className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-rose-900/20 hover:shadow-lg transition-all duration-300">
//               <Link href={`/view-product/${product._id}`}>
//                 {/* Product Image Container - Fixed height and width */}
//                 <div className="h-64 w-full bg-gray-800 flex items-center justify-center p-4 overflow-hidden">
//                   {product.image && product.image.length > 0 ? (
//                     <img
//                       src={product.image[0]}
//                       alt={product.name}
//                       className="max-h-full max-w-full object-contain transform hover:scale-105 transition-transform duration-300"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-gray-500">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                   )}

//                   {/* Stock Badge */}
//                   {product.stock <= 5 && (
//                     <span className={`absolute top-2 right-2 px-2 py-1 rounded-md text-sm font-medium ${product.stock === 0
//                         ? 'bg-red-800 text-white'
//                         : 'bg-yellow-700 text-white'
//                       }`}>
//                       {product.stock === 0 ? 'Out of Stock' : `Only ${product.stock} left`}
//                     </span>
//                   )}
//                 </div>

//                 {/* Product Details */}
//                 <div className="p-4 border-t border-gray-800">
//                   <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{product.name}</h3>
//                   <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>

//                   {/* Price */}
//                   <div className="text-xl font-bold text-rose-500 mb-3">
//                     ₹{product.price.toFixed(2)}
//                   </div>

//                   {/* Product Options */}
//                   <div className="space-y-2">
//                     {/* Size Options */}
//                     {product.size && product.size.length > 0 && (
//                       <div className="flex flex-wrap gap-1">
//                         {product.size.map((size) => (
//                           <span key={size} className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md">
//                             {size}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     {/* Color Options */}
//                     {product.color && product.color.length > 0 && (
//                       <div className="flex flex-wrap gap-1">
//                         {product.color.map((color) => (
//                           <span key={color} className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md">
//                             {color}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </Link>

//               {/* Add to Cart Button */}
//               <div className="px-4 pb-4">
//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   disabled={product.stock === 0}
//                   className={`w-full py-2 rounded-md transition-colors duration-200 ${product.stock === 0
//                       ? 'bg-gray-700 cursor-not-allowed text-gray-500'
//                       : 'bg-rose-700 hover:bg-rose-800 text-white font-semibold'
//                     }`}
//                 >
//                   {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* No Products Found */}
//         {filteredProducts.length === 0 && (
//           <div className="text-center py-12 bg-gray-900 rounded-xl shadow-md">
//             <h3 className="text-xl font-semibold text-gray-300">No products found</h3>
//             <p className="text-gray-400 mt-2">Try adjusting your filters or browse our other categories</p>
//             <button
//               onClick={() => {
//                 setSelectedCategory('all');
//                 setPriceRange({ min: 0, max: 1000000 });
//                 setSearchTerm('');
//               }}
//               className="mt-4 px-6 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-800 transition-colors"
//             >
//               Reset Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BrowseProduct;



'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FiFilter, FiX } from 'react-icons/fi';

const BrowseProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addToCart } = useCart();

  // Filter modal state
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Temporary filter state for the modal
  const [tempFilters, setTempFilters] = useState({
    category: 'all',
    priceMin: 0,
    priceMax: 1000000
  });

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
  }, [selectedCategory, priceRange, searchTerm, products]);

  const handleAddToCart = (product) => {
    const defaultSize = product.size && product.size.length > 0 ? product.size[0] : null;
    const defaultColor = product.color && product.color.length > 0 ? product.color[0] : null;
    addToCart(product, defaultSize, defaultColor, 1);
  };

  // Open filter modal
  const openFilterModal = () => {
    // Initialize temp filters with current values
    setTempFilters({
      category: selectedCategory,
      priceMin: priceRange.min,
      priceMax: priceRange.max
    });
    setShowFilterModal(true);
  };

  // Close filter modal
  const closeFilterModal = () => {
    setShowFilterModal(false);
  };

  // Apply filters from modal
  const applyFilters = () => {
    setSelectedCategory(tempFilters.category);
    setPriceRange({
      min: tempFilters.priceMin,
      max: tempFilters.priceMax
    });
    closeFilterModal();
  };

  // Reset filters
  const resetFilters = () => {
    setTempFilters({
      category: 'all',
      priceMin: 0,
      priceMax: 1000000
    });

    // If we want to apply reset immediately
    setSelectedCategory('all');
    setPriceRange({ min: 0, max: 1000000 });
    setSearchTerm('');
    closeFilterModal();
  };

  return (
    <div className="bg-black text-gray-100 min-h-screen">
      {/* Hero Header Section */}
      <div
        className="relative mb-8 w-full"
        style={{
          minHeight: '320px',
          backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/004/707/493/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg'), linear-gradient(to right,rgba(0, 0, 0, 0.8),rgba(193, 12, 57, 0.8))",
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative px-4 md:px-8 py-12 text-center max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Discover Our Collection
          </h1>
          <p className="text-rose-200 text-lg mb-8 max-w-2xl mx-auto drop-shadow">
            Explore our carefully curated selection of premium products
          </p>

          {/* Search and Filter Bar */}
          <div className="flex justify-center items-center mb-6 gap-2">
            <div className="w-full max-w-md relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <button
              onClick={openFilterModal}
              className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 h-10 w-10"
              aria-label="Open filters"
            >
              <FiFilter size={20} />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            <button
              onClick={() => setSelectedCategory('men')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === 'men'
                ? 'bg-rose-700 text-white'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                }`}
            >
              Men's Fashion
            </button>
            <button
              onClick={() => setSelectedCategory('women')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === 'women'
                ? 'bg-rose-700 text-white'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                }`}
            >
              Women's Fashion
            </button>
            <button
              onClick={() => setSelectedCategory('kids')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === 'kids'
                ? 'bg-rose-700 text-white'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                }`}
            >
              Kids Collection
            </button>
            <button
              onClick={() => setSelectedCategory('accessories')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === 'accessories'
                ? 'bg-rose-700 text-white'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                }`}
            >
              Accessories
            </button>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 pb-12">
        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-400">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
          {(selectedCategory !== 'all' || priceRange.min > 0 || priceRange.max < 1000000) && (
            <button
              onClick={resetFilters}
              className="text-rose-400 hover:text-rose-300 text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-rose-900/20 hover:shadow-lg transition-all duration-300">
              <Link href={`/view-product/${product._id}`}>
                {/* Product Image Container - Fixed height and width */}
                <div className="h-64 w-full bg-white flex items-center justify-center p-4 overflow-hidden">
                  {product.image && product.image.length > 0 ? (
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain transform hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}

                  {/* Stock Badge */}
                  {product.stock <= 5 && (
                    <span className={`absolute top-2 right-2 px-2 py-1 rounded-md text-sm font-medium ${product.stock === 0
                      ? 'bg-red-800 text-white'
                      : 'bg-yellow-700 text-white'
                      }`}>
                      {product.stock === 0 ? 'Out of Stock' : `Only ${product.stock} left`}
                    </span>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4 border-t border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>

                  {/* Price */}
                  <div className="text-xl font-bold text-rose-500 mb-3">
                    ₹{product.price.toFixed(2)}
                  </div>

                  {/* Product Options */}
                  <div className="space-y-2">
                    {/* Size Options */}
                    {product.size && product.size.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {product.size.map((size) => (
                          <span key={size} className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md">
                            {size}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Color Options */}
                    {product.color && product.color.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {product.color.map((color) => (
                          <span key={color} className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md">
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
                  className={`w-full py-2 rounded-md transition-colors duration-200 ${product.stock === 0
                    ? 'bg-gray-700 cursor-not-allowed text-gray-500'
                    : 'bg-rose-700 hover:bg-rose-800 text-white font-semibold'
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
          <div className="text-center py-12 bg-gray-900 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-300">No products found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your filters or browse our other categories</p>
            <button
              onClick={resetFilters}
              className="mt-4 px-6 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Filter Products</h3>
              <button
                onClick={closeFilterModal}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={tempFilters.category}
                  onChange={(e) => setTempFilters({ ...tempFilters, category: e.target.value })}
                  className="w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-rose-500 focus:ring-rose-500"
                >
                  <option value="all">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="accessories">Accessories</option>
                  <option value="men">Men's Fashion</option>
                  <option value="women">Women's Fashion</option>
                  <option value="kids">Kids Collection</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={tempFilters.priceMin}
                    onChange={(e) => setTempFilters({ ...tempFilters, priceMin: Number(e.target.value) })}
                    className="w-1/2 rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-rose-500 focus:ring-rose-500"
                    min="0"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={tempFilters.priceMax}
                    onChange={(e) => setTempFilters({ ...tempFilters, priceMax: Number(e.target.value) })}
                    className="w-1/2 rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-rose-500 focus:ring-rose-500"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-800 flex gap-3">
              <button
                onClick={resetFilters}
                className="w-1/2 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-all"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="w-1/2 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-600 transition-all"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseProduct;
'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

const ViewProduct = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [productData, setProductData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);

    const fetchProductData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/product/getbyid/${id}`);
            setProductData(res.data);
            // Set default selections if available
            if (res.data.size && res.data.size.length > 0) setSelectedSize(res.data.size[0]);
            if (res.data.color && res.data.color.length > 0) setSelectedColor(res.data.color[0]);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    useEffect(() => {
        fetchProductData();
    }, [id]);

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= (productData?.stock || 1)) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (productData) {
            addToCart(productData, selectedSize, selectedColor, quantity);
        }
    };

    if (!productData) return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
    );

    return (
        <div className="bg-black text-gray-200 min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Breadcrumb Navigation */}
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm">
                        <li>
                            <Link href="/" className="text-gray-400 hover:text-rose-400 transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <span className="text-gray-500 mx-1">/</span>
                        </li>
                        <li>
                            <Link href="/browseproduct" className="text-gray-400 hover:text-rose-400 transition-colors">
                                Products
                            </Link>
                        </li>
                        <li>
                            <span className="text-gray-500 mx-1">/</span>
                        </li>
                        <li className="text-rose-400 font-medium truncate max-w-xs">
                            {productData.name}
                        </li>
                    </ol>
                </nav>

                <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Image Gallery Section */}
                        <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-800">
                            {/* Main Image - Fixed height, no cropping */}
                            <div className="h-80 md:h-96 bg-gray-800 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                                {productData.image && productData.image.length > 0 ? (
                                    <img
                                        src={productData.image[selectedImage]}
                                        alt={productData.name}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full w-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Gallery */}
                            {productData.image && productData.image.length > 1 && (
                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 md:gap-3">
                                    {productData.image.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`aspect-square rounded-lg overflow-hidden bg-gray-800 hover:opacity-90 transition ${selectedImage === index
                                                    ? 'ring-2 ring-rose-500'
                                                    : 'ring-1 ring-gray-700'
                                                }`}
                                        >
                                            <div className="h-full w-full flex items-center justify-center">
                                                <img
                                                    src={img}
                                                    alt={`${productData.name} view ${index + 1}`}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Details Section */}
                        <div className="p-6 md:p-8">
                            {/* Header */}
                            <div className="mb-6">
                                {productData.category && (
                                    <p className="text-rose-400 text-sm font-medium mb-2 uppercase tracking-wider">
                                        {productData.category}
                                    </p>
                                )}
                                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    {productData.name}
                                </h1>
                                <p className="text-gray-400">
                                    {productData.description}
                                </p>
                            </div>

                            {/* Price and Stock */}
                            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-800">
                                <div>
                                    <p className="text-3xl font-bold text-white">
                                        ${productData.price?.toFixed(2)}
                                    </p>
                                    <p className={`text-sm mt-1 ${productData.stock > 5
                                            ? 'text-green-400'
                                            : productData.stock > 0
                                                ? 'text-yellow-400'
                                                : 'text-red-400'
                                        }`}>
                                        {productData.stock > 5
                                            ? `${productData.stock} units in stock`
                                            : productData.stock > 0
                                                ? `Only ${productData.stock} left in stock`
                                                : 'Out of stock'}
                                    </p>
                                </div>
                            </div>

                            {/* Options Section */}
                            <div className="space-y-6 mb-8">
                                {/* Size Selection */}
                                {productData.size && productData.size.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-300 mb-3">Size</p>
                                        <div className="flex flex-wrap gap-2">
                                            {productData.size.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedSize === size
                                                            ? 'bg-rose-700 text-white'
                                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Color Selection */}
                                {productData.color && productData.color.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-300 mb-3">Color</p>
                                        <div className="flex flex-wrap gap-2">
                                            {productData.color.map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() => setSelectedColor(color)}
                                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedColor === color
                                                            ? 'bg-rose-700 text-white'
                                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                                        }`}
                                                >
                                                    {color}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quantity Selector */}
                                <div>
                                    <p className="text-sm font-medium text-gray-300 mb-3">Quantity</p>
                                    <div className="flex items-center space-x-1">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={quantity <= 1}
                                            className="p-2 h-10 w-10 flex items-center justify-center rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <div className="h-10 px-4 flex items-center justify-center text-center w-16 bg-gray-800 text-white font-medium">
                                            {quantity}
                                        </div>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            disabled={quantity >= productData.stock}
                                            className="p-2 h-10 w-10 flex items-center justify-center rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={productData.stock === 0}
                                className={`w-full py-4 rounded-lg text-white font-medium text-lg transition-colors ${productData.stock === 0
                                        ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                                        : 'bg-rose-700 hover:bg-rose-800'
                                    }`}
                            >
                                {productData.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>

                            {/* Product Details */}
                            <div className="mt-8 pt-6 border-t border-gray-800">
                                <h3 className="text-lg font-medium text-white mb-4">Product Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="rounded-lg bg-gray-800 p-4">
                                        <p className="text-sm text-gray-400 mb-1">Category</p>
                                        <p className="text-white font-medium">{productData.category || 'Uncategorized'}</p>
                                    </div>
                                    {productData.createdAt && (
                                        <div className="rounded-lg bg-gray-800 p-4">
                                            <p className="text-sm text-gray-400 mb-1">Listed on</p>
                                            <p className="text-white font-medium">
                                                {new Date(productData.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
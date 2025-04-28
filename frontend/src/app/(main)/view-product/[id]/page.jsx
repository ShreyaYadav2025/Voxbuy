'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'

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
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                        {productData.image && productData.image.length > 0 && (
                            <img
                                src={productData.image[selectedImage]}
                                alt={productData.name}
                                className="h-full w-full object-cover object-center"
                            />
                        )}
                    </div>
                    {/* Thumbnail Gallery */}
                    {productData.image && productData.image.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {productData.image.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`aspect-square overflow-hidden rounded-lg bg-gray-100 ${
                                        selectedImage === index ? 'ring-2 ring-blue-500' : ''
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`${productData.name} ${index + 1}`}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{productData.name}</h1>
                        <p className="mt-4 text-gray-600">{productData.description}</p>
                    </div>

                    {/* Price and Stock */}
                    <div className="space-y-2">
                        <p className="text-3xl font-bold text-blue-600">
                            ${productData.price?.toFixed(2)}
                        </p>
                        <p className={`text-sm ${productData.stock > 5 ? 'text-green-600' : 'text-red-600'}`}>
                            {productData.stock > 0 
                                ? `${productData.stock} units in stock` 
                                : 'Out of stock'}
                        </p>
                    </div>

                    {/* Size Selection */}
                    {productData.size && productData.size.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-900">Size</p>
                            <div className="flex flex-wrap gap-2">
                                {productData.size.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                                            selectedSize === size
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
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
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-900">Color</p>
                            <div className="flex flex-wrap gap-2">
                                {productData.color.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                                            selectedColor === color
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                        }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-900">Quantity</p>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                disabled={quantity <= 1}
                                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                            >
                                -
                            </button>
                            <span className="text-lg font-medium">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                disabled={quantity >= productData.stock}
                                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={productData.stock === 0}
                        className={`w-full py-3 px-8 rounded-md text-white font-medium ${
                            productData.stock === 0
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {productData.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>

                    {/* Additional Information */}
                    <div className="pt-6 mt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
                        <div className="mt-4 space-y-3">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Category:</span> {productData.category}
                            </p>
                            {productData.createdAt && (
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Listed on:</span>{' '}
                                    {new Date(productData.createdAt).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
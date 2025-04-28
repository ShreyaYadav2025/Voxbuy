'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const UpdateProduct = () => {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        size: [],
        color: [],
        stock: '',
        image: []
    });

    useEffect(() => {
        fetchProductData();
    }, [id]);

    const fetchProductData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/product/getbyid/${id}`);
            const product = res.data;
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                size: product.size,
                color: product.color,
                stock: product.stock,
                image: product.image
            });
            setImagePreviews(product.image);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Failed to fetch product data');
            router.push('/admin/manage-product');
        }
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        setUploading(true);

        try {
            const uploadPromises = files.map(async (file) => {
                const fd = new FormData();
                fd.append('file', file);
                fd.append('upload_preset', 'VOXBUY');
                fd.append('cloud_name', 'ddqmmmcaa');

                const result = await axios.post(
                    'https://api.cloudinary.com/v1_1/ddqmmmcaa/image/upload',
                    fd
                );
                return result.data.url;
            });

            const uploadedUrls = await Promise.all(uploadPromises);
            const newImages = [...formData.image, ...uploadedUrls];
            setFormData({ ...formData, image: newImages });
            setImagePreviews(prev => [...prev, ...uploadedUrls]);
            toast.success('Images uploaded successfully');
        } catch (err) {
            console.error('Error uploading images:', err);
            toast.error('Failed to upload images');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        const newImages = formData.image.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setFormData({ ...formData, image: newImages });
        setImagePreviews(newPreviews);
    };

    const handleSizeToggle = (size) => {
        const currentSizes = formData.size;
        const updatedSizes = currentSizes.includes(size)
            ? currentSizes.filter(s => s !== size)
            : [...currentSizes, size];
        setFormData({ ...formData, size: updatedSizes });
    };

    const handleColorToggle = (color) => {
        const currentColors = formData.color;
        const updatedColors = currentColors.includes(color)
            ? currentColors.filter(c => c !== color)
            : [...currentColors, color];
        setFormData({ ...formData, color: updatedColors });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/product/update/${id}`, formData);
            toast.success('Product updated successfully');
            router.push('/admin/manage-product');
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Failed to update product');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Update Product</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Price Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    {/* Category Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="books">Books</option>
                            <option value="accessories">Accessories</option>
                        </select>
                    </div>

                    {/* Stock Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                            min="0"
                        />
                    </div>

                    {/* Size Options */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                        <div className="flex flex-wrap gap-2">
                            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => handleSizeToggle(size)}
                                    className={`px-4 py-2 rounded-md ${
                                        formData.size.includes(size)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Options */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                        <div className="flex flex-wrap gap-2">
                            {['Red', 'Blue', 'Green', 'Black', 'White'].map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => handleColorToggle(color)}
                                    className={`px-4 py-2 rounded-md ${
                                        formData.color.includes(color)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="mt-1 block w-full"
                            disabled={uploading}
                        />
                        {uploading && (
                            <div className="text-blue-500 text-sm mt-2">Uploading images...</div>
                        )}
                        <div className="mt-4 grid grid-cols-4 gap-4">
                            {imagePreviews.map((url, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={url}
                                        alt={`Preview ${index + 1}`}
                                        className="h-24 w-24 object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-sm"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => router.push('/admin/manage-product')}
                            className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
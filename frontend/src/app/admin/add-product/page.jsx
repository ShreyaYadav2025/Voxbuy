'use client'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Addproduct = () => {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploading, setUploading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            description: "",
            category: "",
            image: [],
            stock: "",
            size: [],
            color: [],
        },
        onSubmit: (values, { resetForm }) => {
            axios.post('http://localhost:5000/product/add', values)
                .then((result) => {
                    console.log(result.data);
                    toast.success("Product added successfully")
                    resetForm();
                    setImagePreviews([]);
                }).catch((err) => {
                    console.log(err);
                    toast.error("Something went wrong")
                });
        }
    });

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
            
            // Update form values with new URLs
            const newImages = [...formik.values.image, ...uploadedUrls];
            formik.setFieldValue('image', newImages);
            
            // Update previews
            setImagePreviews(prev => [...prev, ...uploadedUrls]);
            toast.success('Images uploaded successfully');
        } catch (err) {
            console.log(err);
            toast.error('Failed to upload images');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        const newImages = formik.values.image.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        formik.setFieldValue('image', newImages);
        setImagePreviews(newPreviews);
    };

    const handleSizeChange = (size) => {
        const currentSizes = formik.values.size;
        const updatedSizes = currentSizes.includes(size)
            ? currentSizes.filter(s => s !== size)
            : [...currentSizes, size];
        formik.setFieldValue('size', updatedSizes);
    };

    const handleColorChange = (color) => {
        const currentColors = formik.values.color;
        const updatedColors = currentColors.includes(color)
            ? currentColors.filter(c => c !== color)
            : [...currentColors, color];
        formik.setFieldValue('color', updatedColors);
    };

    return (
        <div>
            <div className="max-w-lg mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
                <form onSubmit={formik.handleSubmit} className="max-w-2xl space-y-6">
                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                        )}
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
                        <div className="mt-2 grid grid-cols-3 gap-2">
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

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {formik.touched.description && formik.errors.description && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {formik.touched.price && formik.errors.price && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.category}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="books">Books</option>
                            <option value="accessories">Accessories</option>
                        </select>
                        {formik.touched.category && formik.errors.category && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
                        )}
                    </div>

                    {/* Size Options */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                        <div className="flex gap-2 flex-wrap">
                            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => handleSizeChange(size)}
                                    className={`px-4 py-2 rounded-md ${formik.values.size.includes(size)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700'
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
                        <div className="flex gap-2 flex-wrap">
                            {['Red', 'Blue', 'Green', 'Black', 'White'].map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => handleColorChange(color)}
                                    className={`px-4 py-2 rounded-md ${formik.values.color.includes(color)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.stock}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {formik.touched.stock && formik.errors.stock && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.stock}</div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Addproduct
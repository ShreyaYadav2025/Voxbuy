'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'

const ManageProduct = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchProductData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/product/getall')
            setProducts(res.data)
        } catch (error) {
            console.error('Error fetching products:', error)
            toast.error('Failed to fetch products')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProductData();
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5000/product/delete/${id}`)
                toast.success('Product deleted successfully')
                fetchProductData() // Refresh the list
            } catch (error) {
                console.error('Error deleting product:', error)
                toast.error('Failed to delete product')
            }
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
                <Link 
                    href="/admin/add-product" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Add New Product
                </Link>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Image</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Category</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Stock</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    {product.image && product.image.length > 0 ? (
                                        <img
                                            src={product.image[0]}
                                            alt={product.name}
                                            className="h-16 w-16 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
                                            No Image
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900">{product.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">${product.price.toFixed(2)}</td>
                                <td className="px-4 py-3 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        product.stock > 10
                                            ? 'bg-green-100 text-green-800'
                                            : product.stock > 0
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.stock} units
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/admin/update-product/${product._id}`}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {products.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No products found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ManageProduct
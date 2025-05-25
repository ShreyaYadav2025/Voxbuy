'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/product/getall');
        const data = await response.json();
        // Get only the first 4 products
        setProducts(data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Link href={`/view-product/${product._id}`} key={product._id} className="block group relative">
          <div className="relative mb-2 overflow-hidden rounded-lg bg-white">
            <img
              src={product.image[0]}
              loading="lazy"
              alt={product.name}
              className="h-96 w-full object-contain object-center transition duration-200 group-hover:scale-110"
            />
            {product.stock <= 5 && product.stock > 0 && (
              <div className="absolute bottom-2 left-0">
                <span className="rounded-r-lg bg-rose-600 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">
                  Low Stock
                </span>
              </div>
            )}
            {product.stock === 0 && (
              <div className="absolute bottom-2 left-0">
                <span className="rounded-r-lg bg-gray-800 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
          <div className="flex items-start justify-between gap-2 px-2">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white transition duration-100 hover:text-gray-300 lg:text-xl">
                {product.name}
              </span>
              <span className="text-gray-400">{product.category}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-bold text-gray-300 lg:text-lg">₹{product.price}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedProducts;

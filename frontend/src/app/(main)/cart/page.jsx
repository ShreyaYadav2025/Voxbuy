'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Tax calculation (8.25%)
  const taxRate = 0.0825;
  const subtotal = getCartTotal();
  const taxAmount = subtotal * taxRate;
  
  // Handling fee (flat ₹2.99)
  const handlingFee = 2.99;
  
  // Free shipping threshold
  const freeShippingThreshold = 75;
  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 5.99;
  
  // Calculate grand total
  const grandTotal = subtotal + taxAmount + handlingFee + shippingFee - discount;

  // Apply promo code
  const handleApplyPromo = () => {
    // Reset messages
    setPromoError('');
    setPromoSuccess('');
    
    // Sample promo codes
    if (promoCode === 'WELCOME10') {
      setDiscount(subtotal * 0.1);
      setPromoSuccess('10% discount applied!');
    } else if (promoCode === 'FREE5') {
      setDiscount(5);
      setPromoSuccess('₹5 discount applied!');
    } else {
      setPromoError('Invalid promo code');
      setDiscount(0);
    }
  };

  // Save cart to localStorage effect
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center bg-black text-white min-h-screen">
        <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-24 w-24 mx-auto text-rose-500 mb-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Add some items to your cart to get started!</p>
          <Link 
            href="/browseproduct" 
            className="inline-block bg-rose-700 text-white px-6 py-3 rounded-lg hover:bg-rose-800 transition-all duration-300 transform hover:scale-105"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.size}-${item.color}`} className="flex gap-4 bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-rose-900/30 transition-shadow">
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <div className="text-sm text-gray-400 mt-1">
                      <span className="mr-4">Size: {item.size}</span>
                      <span>Color: {item.color}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center border border-gray-700 rounded-md bg-gray-800">
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.color, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1 border-r border-gray-700 hover:bg-gray-700 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.color, Math.min(item.stock, item.quantity + 1))}
                          className="px-3 py-1 border-l border-gray-700 hover:bg-gray-700 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id, item.size, item.color)}
                        className="text-rose-500 hover:text-rose-400 transition-colors flex items-center"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 mr-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-lg font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-400">₹{item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-rose-500 hover:text-rose-400 flex items-center text-sm font-medium transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  />
                </svg>
                Clear Cart
              </button>
              <Link
                href="/browseproduct"
                className="text-white flex items-center text-sm font-medium hover:text-rose-300 transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16l-4-4m0 0l4-4m-4 4h18" 
                  />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-800">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-6">
                <label htmlFor="promo" className="block text-sm font-medium mb-2 text-gray-300">Promo Code</label>
                <div className="flex">
                  <input
                    type="text"
                    id="promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="bg-rose-700 text-white px-4 py-2 rounded-r-lg hover:bg-rose-800"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="mt-1 text-sm text-rose-500">{promoError}</p>}
                {promoSuccess && <p className="mt-1 text-sm text-green-500">{promoSuccess}</p>}
              </div>
              
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tax (8.25%)</span>
                  <span>₹{taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Handling Fee</span>
                  <span>₹{handlingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span>
                  {subtotal >= freeShippingThreshold ? (
                    <span className="text-green-500">Free</span>
                  ) : (
                    <span>₹{shippingFee.toFixed(2)}</span>
                  )}
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-rose-400">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              {subtotal < freeShippingThreshold && (
                <div className="mb-6 bg-gray-800 p-3 rounded-lg text-sm text-center">
                  <p>Add <span className="text-rose-400 font-bold">₹{(freeShippingThreshold - subtotal).toFixed(2)}</span> more for free shipping</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-rose-500 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (subtotal/freeShippingThreshold)*100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="border-t border-gray-800 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link 
                href="/checkout" 
                className="block text-center w-full bg-rose-700 text-white py-3 rounded-lg hover:bg-rose-800 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Proceed to Checkout
              </Link>
              
              <div className="mt-6 flex items-center justify-center space-x-4">
                <img src="/visa.svg" alt="Visa" className="h-6" />
                <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                <img src="/paypal.svg" alt="PayPal" className="h-6" />
                <img src="/applepay.svg" alt="Apple Pay" className="h-6" />
              </div>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                Your personal data will be used to process your order, support your experience, and other purposes described in our privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
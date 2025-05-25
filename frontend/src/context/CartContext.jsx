'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize, selectedColor, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => 
          item._id === product._id && 
          item.size === selectedSize && 
          item.color === selectedColor
      );

      if (existingItem) {
        // Check if adding quantity exceeds stock
        if (existingItem.quantity + quantity > product.stock) {
          toast.error('Cannot add more than available stock');
          return prevItems;
        }

        return prevItems.map(item =>
          item._id === product._id && 
          item.size === selectedSize && 
          item.color === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Check if new quantity exceeds stock
      if (quantity > product.stock) {
        toast.error('Cannot add more than available stock');
        return prevItems;
      }

      toast.success('Added to cart');
      return [...prevItems, {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image[0],
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        stock: product.stock
      }];
    });
  };

  const removeFromCart = (productId, size, color) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item._id === productId && item.size === size && item.color === color)
      )
    );
    toast.success('Removed from cart');
  };

  const updateQuantity = (productId, size, color, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item._id === productId && item.size === size && item.color === color) {
          if (newQuantity > item.stock) {
            toast.error('Cannot add more than available stock');
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      isLoaded
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
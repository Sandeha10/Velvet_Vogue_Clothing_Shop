import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 1. Add to Cart
  const addToCart = (product, quantity, size, color) => {
    setCartItems((prevItems) => {
      const isExist = prevItems.find(item => item._id === product._id && item.selectedSize === size && item.selectedColor === color);
      if (isExist) {
        return prevItems.map(item => 
          item._id === product._id && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  
  const updateQuantity = (id, size, color, newQty) => {
    if (newQty < 1) return; 
    setCartItems(cartItems.map(item => 
      item._id === id && item.selectedSize === size && item.selectedColor === color
        ? { ...item, quantity: newQty }
        : item
    ));
  };

  // 3. Remove Item
  const removeFromCart = (id, size, color) => {
    setCartItems(cartItems.filter(item => !(item._id === id && item.selectedSize === size && item.selectedColor === color)));
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
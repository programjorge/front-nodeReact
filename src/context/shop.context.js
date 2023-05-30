import React, { createContext, useState } from 'react';

// Crea el contexto del carrito de la compra
export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  // Agrega un producto al carrito
  const addToCart = (product) => {
    setCartItems(product.id,product.name,product.price);
  };

  // Elimina un producto del carrito
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  // Limpia el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Proporciona el estado y las funciones del carrito al contexto
  const cartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

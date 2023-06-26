import React, { createContext, useState } from 'react';

// Crea el contexto del carrito de la compra
export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Agrega un producto al carrito
  const addToCart = (product) => {

    setCartItems(state => {
      let cantidad = state.filter(item => item.id === product.id)[0]?.cantidad;
      if(cantidad){
        const index = state.findIndex(item => item.id === product.id);
        const newState = [...state];
        newState.splice(index,1,{...product,cantidad: cantidad+1});
        return newState;
      }
       else{
        return [
          ...state,
          {...product,cantidad:1}
        ];
      }
    });

  };

  // Elimina un producto del carrito
  const removeFromCart = (productId) => {
    setCartItems((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === productId) {
          if (product.cantidad > 1) {
            return {
              ...product,
              cantidad: product.cantidad - 1
            };
          }
          // Si la cantidad es 1 o menos, el producto se elimina del array
          return null;
        }
        return product;
      });
  
      // Filtramos los productos nulos (productos eliminados)
      const filteredProducts = updatedProducts.filter((product) => product !== null);
      return filteredProducts;
    });
  };

  const addCantidad = (productId) => {
    setCartItems((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === productId) {
            return {
              ...product,
              cantidad: product.cantidad + 1
            };
        }
        return product;
      });
  
      // Filtramos los productos nulos (productos eliminados)
      const filteredProducts = updatedProducts.filter((product) => product !== null);
      return filteredProducts;
    });
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
    addCantidad
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

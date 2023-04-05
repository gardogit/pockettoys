import { createContext, useState, useEffect } from 'react';
import commerce from './commerce';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const response = await commerce.cart.retrieve();
    setCart(response);
  };

  const addToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setCart(response.cart);
  };

  const updateCartItem = async (itemId, quantity) => {
    const response = await commerce.cart.update(itemId, { quantity });
    setCart(response.cart);
  };

  const removeFromCart = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setCart(response.cart);
  };

  const emptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, updateCartItem, removeFromCart, emptyCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

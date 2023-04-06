import { createContext, useState, useEffect } from 'react';
import commerce from './commerce';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [cartChanged, setCartChanged] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const response = await commerce.cart.retrieve();
    setCart(response);
  };

  const addToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    console.log("productId:", productId, "quantity:", quantity);
    setCart(response.cart);
    setCartChanged(true);
  };

  const updateCartItem = async (itemId, quantity) => {
    await commerce.cart.update(itemId, { quantity });
    fetchCart();
    setCartChanged(true);
  };

  const removeFromCart = async (itemId) => {
    await commerce.cart.remove(itemId);
    fetchCart();
  };

  const emptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
    setCartChanged(true);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartItem,
        removeFromCart,
        emptyCart,
        loadingItemId,
        setLoadingItemId,
        cartChanged,
        setCartChanged,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

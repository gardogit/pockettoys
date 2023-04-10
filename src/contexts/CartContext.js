//CartContext.js
import { createContext, useState, useEffect } from 'react';
import commerce from '../services/commerce';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : null;
  });
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [cartChanged, setCartChanged] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(() => {
    const localData = localStorage.getItem('lastAddedItem');
    return localData ? JSON.parse(localData) : null;
  });

  useEffect(() => {
    if (!cart) {
      fetchCart();
    }
  }, [cart]);

  const fetchCart = async () => {
    const response = await commerce.cart.retrieve();
    setCartAndSave(response);
    setCartChanged(false);
  };

  const setCartAndSave = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await commerce.cart.add(productId, quantity);
      setCartAndSave(response);
      const lastItem = response.line_items.find(item => item.product_id === productId);
      setLastAddedItemAndSave(lastItem);
    } catch (error) {
    }
  };

  const setLastAddedItemAndSave = (newLastAddedItem) => {
    localStorage.setItem('lastAddedItem', JSON.stringify(newLastAddedItem));
    setLastAddedItem(newLastAddedItem);
  };

  const updateCartItem = async (itemId, quantity) => {
    const response = await commerce.cart.update(itemId, { quantity });
    setCartAndSave(response);
    setCartChanged(true);
  };

  const removeFromCart = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setCartAndSave(response);
  };

  const emptyCart = async () => {
    const response = await commerce.cart.empty();
    setCartAndSave(response.cart);
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
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


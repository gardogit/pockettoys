import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';

function Cart() {
  const { cart, updateCartItem, removeFromCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (cart && Array.isArray(cart.line_items)) {
      const initialQuantities = cart.line_items.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cart]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities({ ...quantities, [itemId]: newQuantity });
  };

  const handleAddToCart = async (itemId) => {
    const updatedQuantity = quantities[itemId] + 1;
    handleQuantityChange(itemId, updatedQuantity);
    await updateCartItem(itemId, updatedQuantity);
  };

  const handleRemoveFromCart = async (itemId) => {
    const updatedQuantity = quantities[itemId] - 1;
    handleQuantityChange(itemId, updatedQuantity);
    await updateCartItem(itemId, updatedQuantity);
  };

  if (!cart || !Array.isArray(cart.line_items)) {
    return <p>Cargando carrito...</p>;
  }

  return (
    <div>
      <h1>Carrito de compras</h1>
      {cart.line_items.map((item) => (
        <div key={item.id}>
          <img src={item.image.url} alt={item.name} />
          <h2>{item.name}</h2>
          <p>{item.price.formatted_with_symbol}</p>
          <button onClick={() => handleRemoveFromCart(item.id)}>-</button>
          <span>{quantities[item.id]}</span>
          <button onClick={() => handleAddToCart(item.id)}>+</button>
          <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
        </div>
      ))}
      {cart.line_items.length === 0 && <p>No hay productos en el carrito</p>}
    </div>
  );
}

export default Cart;

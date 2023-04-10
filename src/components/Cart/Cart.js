//Cart.js
import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../contexts/CartContext';
import commerce from '../../services/commerce';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

function Cart() {
  const {
    cart,
    updateCartItem,
    removeFromCart,
    setLoadingItemId,
    cartChanged,
    setCartChanged,
    fetchCart,
  } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});
  const [removingItemId, setRemovingItemId] = useState(null);
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    const fetchInventory = async () => {
      const newInventory = {};
  
      for (const item of cart.line_items) {
        const product = await commerce.products.retrieve(item.product_id);
        newInventory[item.id] = product.inventory.available;
      }
  
      setInventory(newInventory);
    };
  
    if (cart && Array.isArray(cart.line_items)) {
      fetchInventory();
    }
  }, [cart]);

  useEffect(() => {
    if (cart && Array.isArray(cart.line_items)) {
      const initialQuantities = cart.line_items.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cart]);

  useEffect(() => {
    if (cartChanged) {
      fetchCart();
      setCartChanged(false);
    }
  });

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities({ ...quantities, [itemId]: newQuantity });
  };

  const handleDecreaseQuantity = async (itemId) => {
    if (quantities[itemId] > 1) {
      const updatedQuantity = quantities[itemId] - 1;
      handleQuantityChange(itemId, updatedQuantity);
      updateCartItem(itemId, updatedQuantity);
    }
  };  

  const handleIncreaseQuantity = (itemId) => {
    const updatedQuantity = quantities[itemId] + 1;
    handleQuantityChange(itemId, updatedQuantity);
    updateCartItem(itemId, updatedQuantity);
  };
   
  const handleRemoveFromCart = async (itemId) => {
    setRemovingItemId(itemId);
    await removeFromCart(itemId);
    setCartChanged(true);
  };

  if (!cart || !Array.isArray(cart.line_items)) {
    return <p>Cargando carrito...</p>;
  }

  return (
    <Container style={{ maxWidth: '980px', padding: '24px'}}>
    <h1>Carrito de compras</h1>
    {cart.line_items.map((item) => {
      const totalPrice = (item.price.raw * quantities[item.id]).toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        useGrouping: true,
      }).replace(".", ",");

      return (
        <Row className="my-3" key={item.id} style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 6 }}>
          <Col xs={2} className="container d-flex justify-content-end">
            <Image
              src={item.image.url}
              alt={item.name}
              roundedCircle
              style={{ width: '64px', height: '64px' }}
            />
          </Col>
          <Col xs={4}>
            <p className='text-secondary text-lg'>{item.name}</p>
            {removingItemId === item.id ? (
              <span>Eliminando producto...</span>
            ) : (
              <Button
                variant="link"
                onClick={() => handleRemoveFromCart(item.id)}
                className="button p-0"
              >
                Eliminar
              </Button>
            )}
          </Col>

          <Col xs={3}>

            <Col xs={6} className="border container text-center d-flex align-items-center justify-content-between">
              <Button
                variant="link"
                onClick={() => handleDecreaseQuantity(item.id)}
                className="border-0 p-0"
                disabled={quantities[item.id] === 1}
                style={{
                  textDecoration: 'none',
                  padding: '8px 12px',
                  color: quantities[item.id] === 1 ? 'inherit' : '#007bff',
                  fontWeight: 'bold',
                }}
              >
                -
              </Button>
              <span className="mx-2" style={{ padding: '8px 12px' }}>{quantities[item.id]}</span>
              <Button
                variant="link"
                onClick={() => handleIncreaseQuantity(item.id)}
                className="border-0 p-0"
                disabled={quantities[item.id] === inventory[item.id]}
                style={{
                  textDecoration: 'none',
                  padding: '8px 12px',
                  color: quantities[item.id] === inventory[item.id] ? 'inherit' : '#007bff',
                  fontWeight: 'bold',
                }}
              >
                +
              </Button>
            </Col>
          
            <p className="mt-2 container text-center">Stock: {inventory[item.id]}</p>
          </Col>

          <Col xs={3} className="container d-flex">
            <p className='ms-auto text-secondary text-lg'>{totalPrice}</p>
          </Col>
        </Row>
      );
    })}
      {cart.line_items.length === 0 && <p>No hay productos en el carrito</p>}
      <hr />
      <Row className="align-items-center">
        <Col xs={{ span: 3, offset: 9 }} className="container text-end">
          <p className='text-lg'>
            Total: {cart.subtotal.formatted_with_symbol}
          </p>
          <Link to="/login">
            <Button variant="primary" style={{ whiteSpace: 'nowrap' }}>Continuar compra</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
// PreCart.js
import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

function PreCart() {
  const { lastAddedItem, cart, saveCart } = useContext(CartContext);

  if (!lastAddedItem || cart.total_items === 0) {
    return <p>No se ha agregado ningún producto al carrito</p>;
  }

  const totalUniqueItems = cart.total_unique_items;
  const totalPrice = cart.subtotal.formatted_with_symbol;

  return (
    <Container style={{ backgroundColor: '#fff', maxWidth: '850px', padding: '24px', borderRadius: 6 }}>
  <Row style={{ alignItems: 'center' }}>
    <Col xs={2}>
      <Image src={lastAddedItem.image.url} alt={lastAddedItem.name} roundedCircle style={{ width: '64px', height: '64px', border: '4px solid #C6C7C8', }} />
    </Col>
    <Col xs={4}>
      <strong>Agregaste a tu carrito</strong>
      <p>{lastAddedItem.name}</p>
    </Col>
    <Col xs={4}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <p>
            {totalUniqueItems} producto{totalUniqueItems > 1 ? 's' : ''} en el carrito:{' '}
            <strong>{totalPrice}</strong>
          </p>
        </div>
        <div style={{ display: 'flex' }}>
          {cart.line_items.map((item, index) => {
            if (index < 2 && item.id && item.image) {
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    marginLeft: index > 0 ? '-10px' : '0',
                  }}
                >
                  <Image
                    src={item.image.url}
                    alt={item.name}
                    roundedCircle
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '4px solid #fff',
                    }}
                  />
                </div>
              );
            } else if (index === 2) {
              return (
                <div
                  key="more"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#C6C7C8',
                    borderRadius: '50%',
                    border: '4px solid #fff',
                    marginLeft: '-10px',
                    width: '40px',
                    height: '40px',
                    lineHeight: '32px',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  +{totalUniqueItems - 2}
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </Col>
    <Col xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Link to="/carrito">
        <Button variant="primary" style={{ whiteSpace: 'nowrap' }}>Ver carrito</Button>
      </Link>
    </Col>
  </Row>
</Container>

  );
}

export default PreCart;

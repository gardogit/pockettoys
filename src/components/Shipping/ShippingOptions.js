// ShippingOptions.js
import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Container, Row, Col, Button, Image, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ShippingOptions() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const totalProducts = cart.total_items;
  const [shippingOption, setShippingOption] = useState('store_pickup');
  const customerAddress = 'Calle del Cliente 123, Ciudad, Región Metropolitana';
  const storeAddress = 'Cam. Internacional 4200, Pucón, Araucanía';

  const handleShippingOptionChange = (e) => {
    setShippingOption(e.target.value);
  };

  const handleContinueToPayment = () => {
    navigate('/payment-options');
  };

  // Reemplaza isLoggedIn con la condición real que verifica si el usuario ha iniciado sesión
  const isLoggedIn = false;

  return (
    <Container style={{ maxWidth: '1024px', padding: '24px' }}>
      <h1>Opciones de envío</h1>
      <Row>
        <Col xs={8} style={{ borderRadius: 6 }}>
        
        <Row className="mb-2">
            <Col>
              <Card>
                <Card.Body>
                  <Form.Check
                    type="radio"
                    id="store_pickup"
                    label="Retiro en tienda"
                    value="store_pickup"
                    checked={shippingOption === 'store_pickup'}
                    onChange={handleShippingOptionChange}
                    custom
                    className=""
                  />
                  <p>{storeAddress}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Form.Check
                    type="radio"
                    id="home_delivery"
                    label="Despacho a domicilio"
                    value="home_delivery"
                    checked={shippingOption === 'home_delivery'}
                    onChange={handleShippingOptionChange}
                    custom
                    className=""
                  />
                  {isLoggedIn && <p>{customerAddress}</p>}
                  {!isLoggedIn && (
                    <>
                      <Button variant="primary" className="">Registrarse</Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {cart.line_items.map((item) => (
            <Row key={item.id} style={{ backgroundColor: '#fff', paddingTop: '24px', paddingBottom: '24px', marginBottom: '10px', borderRadius: '6px'}}>
              <Col xs={2} className="container d-flex justify-content-end">
                <Image
                  src={item.image.url}
                  alt={item.name}
                  roundedCircle
                  style={{ width: '64px', height: '64px' }}
                />
              </Col>
              <Col xs={8}>
                <p className='text-secondary'>{item.name}, Cantidad: {item.quantity}</p>
                <p>{item.price.formatted_with_symbol} c/u</p>
              </Col>
            </Row>
          ))}
          <Row style={{ padding: '10px'}}>
            <div className="text-end mt-3">
                <Button
                variant="primary"
                onClick={handleContinueToPayment}
                >
                Continuar con el pago
                </Button>
            </div>
          </Row>
          
        </Col>
        <Col xs={4}>
          <div className="position-sticky" style={{ top: '0' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 6, padding: '24px'}}>
              <h3>Resumen de compra</h3>
              <Row>
                <Col xs={6}>Productos ({totalProducts}):</Col>
                <Col xs={6} className="text-end">{cart.subtotal.formatted_with_symbol}</Col>
              </Row>
              <Row>
                <Col xs={6}>Envío:</Col>
                <Col xs={6} className="text-end">Gratis</Col>
              </Row>
              <hr />
              <Row>
                <Col xs={6}><strong>Total:</strong></Col>
                <Col xs={6} className="text-end"><strong>{cart.subtotal.formatted_with_symbol}</strong></Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ShippingOptions;

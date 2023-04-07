import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import commerce from '../commerce';
import { CartContext } from '../CartContext';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const { addToCart, fetchCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await commerce.products.retrieve(productId);
        setProduct(response);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async (productId) => {
    await addToCart(productId, quantity);
    fetchCart();
    navigate('/precarrito');
  };

  const handleChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          <Card.Img src={product.image.url} alt={product.name} />
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text
                className="product-description"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              <Card.Text>Price: {product.price.formatted_with_symbol}</Card.Text>
              <Form.Group controlId="quantity">
                <Form.Label>Cantidad:</Form.Label>
                <Form.Control
                  as="select"
                  value={quantity}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6].map((value) => (
                    <option key={value} value={value}>
                      {value} unidad{value > 1 ? 'es' : ''}
                    </option>
                  ))}
                </Form.Control>
                <span> (Stock: {product.inventory.available})</span>
              </Form.Group>
              <Button onClick={() => handleAddToCart(productId)}>
                Agregar al carrito
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;

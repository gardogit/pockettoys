//ProductDetail.js
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import commerce from '../commerce';
import { CartContext } from '../CartContext';
import { Card, Container, Row, Col, Button, Form, Image } from 'react-bootstrap';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { productId } = useParams();
  const { addToCart, fetchCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await commerce.products.retrieve(productId);
        setProduct(response);
        setImages(response.assets);
        setSelectedImage(response.assets[0]);
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
    <Container className='cont' style={{ width: '980px', padding: '24px', background: '#fff'}}>
      <Row>
        <Col xs={2} style={{ width: '100px'}}>
            {images.map((image) => (
              <div>
              <Image
                key={image.id}
                src={image.url}
                alt={product.name}
                className="mb-3"
                style={{
                  width: '64px',
                  height: '64px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  border: image.id === selectedImage.id ? '2px solid #0d6efd' : 'none',
                  borderRadius: '6px',
                }}
                onMouseOver={() => setSelectedImage(image)}
              />
              </div>
            ))}
        </Col>
        <Col xs={6}>
            <Image
              src={selectedImage.url}
              alt={product.name}
              style={{ width: '400px', objectFit: 'contain' }}
            />
        </Col>
        <Col xs={4}>
            <Card
              style={{
                width: 'auto',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text
                  className="product-description"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                <Card.Title>Price: {product.price.formatted_with_symbol}</Card.Title>
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

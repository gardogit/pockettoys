// ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import commerce from '../../services/commerce';
import { Card, CardDeck, Container, Row, Col } from 'react-bootstrap';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts(response.data);
  };

  return (
    <Container>
      <h1>Productos</h1>
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card className="product-card mb-4">
                <Link to={`/product/${product.id}`} className="text-decoration-none">
                  <Card.Img
                    variant="top"
                    src={product.image.url}
                    alt={product.name}
                    style={{ height: '210px', objectFit: 'cover'}}
                  />
                  <hr style={{ borderTop: '1px solid #EBEBEB', margin: '0' }} />
                  <Card.Body>
                    <Card.Title className="mb-2" style={{ fontSize: '24px', color: '#484349' }}>
                      {product.price.formatted_with_symbol}
                    </Card.Title>
                    <Card.Text style={{ fontSize: '14px', color: '#484349' }}>
                      {product.name}
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </Row>
    </Container>
    
  );
}

export default ProductList;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './Cart';
import PreCart from './PreCart';
import { CartProvider } from './CartContext';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Container fluid style={{ backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductList />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/precarrito" element={<PreCart />} />
            <Route path="*" element={<Outlet />} />
          </Routes>
        </Container>
      </Router>
    </CartProvider>
  );
}

export default App;

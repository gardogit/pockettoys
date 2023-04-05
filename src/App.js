import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './Cart';
import { CartProvider } from './CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="*" element={<Outlet />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;


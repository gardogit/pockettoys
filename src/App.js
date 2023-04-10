//App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/Product/ProductList';
import ProductDetail from './components/Product/ProductDetail';
import AuthTabs from './components/Auth/AuthTabs';
import Cart from './components/Cart/Cart';
import PreCart from './components/Cart/PreCart';
import ShippingOptions from './components/Shipping/ShippingOptions';
import HomePage from './pages/HomePage';
import { CartProvider } from './contexts/CartContext';
import { Container } from 'react-bootstrap';
import { subscribeToAuthChanges } from './services/firebase/firebaseUtils';
import { getAuth, signOut } from "firebase/auth";
import { AuthTabProvider } from './contexts/AuthTabContext';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthTabProvider>
      <CartProvider>
        <Router>
          <Navbar user={user} />
          <Container fluid style={{ backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/productos" element={<ProductList />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/precarrito" element={<PreCart />} />
              <Route path="/shipping-options" element={<ShippingOptions />} />
              <Route path="/AuthTabs" element={<AuthTabs />} />
              <Route path="*" element={<Outlet />} />
            </Routes>
          </Container>
        </Router>
      </CartProvider>
    </AuthTabProvider>
  );
}

export default App;

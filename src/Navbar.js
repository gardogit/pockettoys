import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarBootstrap() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Mi Tienda</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
          <Nav.Link as={Link} to="/carrito">Carrito</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarBootstrap;

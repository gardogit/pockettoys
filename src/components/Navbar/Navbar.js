// Navbar.js
import React, { useState, useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { handleSignOut } from '../Auth/AuthTabs';
import { AuthTabContext } from '../../contexts/AuthTabContext';

function NavbarBootstrap({ user }) {
  const { setActiveTab } = useContext(AuthTabContext);
  const [tabKey, setTabKey] = useState('login');

  const handleAuthTabsClick = (key) => {
    setTabKey(key);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Pocket Toys</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/productos" className="text-decoration-none">
            Productos
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          {user ? (
            <>
              <NavDropdown title={`Hola, ${user.displayName}`} id="user-dropdown">
                <NavDropdown.Item as={Link} to="/perfil" className="text-decoration-none">
                  Ver perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="#" className="text-decoration-none" onClick={handleSignOut}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Nav.Link
                as={Link}
                to="/AuthTabs"
                className="text-decoration-none"
                onClick={() => handleAuthTabsClick('register')}
              >
                Crea tu cuenta
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/AuthTabs"
                className="text-decoration-none"
                onClick={() => handleAuthTabsClick('login')}
              >
                Ingresa
              </Nav.Link>
            </>
          )}
          <Nav.Link as={Link} to="/carrito" className="text-decoration-none">
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarBootstrap;

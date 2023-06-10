"use client";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";

const NavbarComponent = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="border-bottom border-light">
      <Container>
        <Navbar.Brand href="/" as={Link}>Creaciones Valladolid</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="ms-auto"
            defaultActiveKey="#home"
          >
              <Nav.Link href="/" as={Link}>Inicio</Nav.Link>
              <Nav.Link href="/cart" as={Link}>Carrito</Nav.Link>
              <Nav.Link href="#hola" as={Link}>Contacto</Nav.Link>
              <Nav.Link href="#otro" as={Link}>Iniciar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

"use client";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import Badge from "react-bootstrap/Badge";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";

const NavbarComponent = () => {
  const { selectedProducts } = useContext(ProductsContext);

  const [productsQuantity, setProductsQuantity] = useState(0);

  useEffect(() => {
    let count = 0;
    selectedProducts.forEach(({ quantity }) => (count += quantity));

    setProductsQuantity(count);
  }, [selectedProducts]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="border-bottom border-light"
    >
      <Container>
        <Navbar.Brand href="/" as={Link}>
          Creaciones Valladolid
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="/" variant="tabs">
            <Nav.Item className="p-2">
              <Nav.Link href="/" as={Link}>
                Inicio
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="p-2">
              <Nav.Link href="/cart" as={Link}>
                Carrito
                {productsQuantity > 0 ? (
                  <Badge bg="light" className="text-dark ms-1">
                    {productsQuantity}
                  </Badge>
                ) : null}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="p-2">
              <Nav.Link href="/contact" as={Link}>
                Contacto
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

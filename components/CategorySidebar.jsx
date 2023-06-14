"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import { usePathname } from "next/navigation";

const CategorySidebar = ({ categories }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="pe-lg-5 pt-lg-5 p-3 text-bg-dark">
      <Button variant="light" className="d-lg-none text-decoration-underline" onClick={handleShow}>
        Categorías
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        responsive="lg"
        className="text-bg-dark"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Categorías</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav
            className="d-flex flex-column"
            activeKey={usePathname()}
            variant="pills"
          >
            {categories.map((category) => (
              <Nav.Item
                key={category}
                className="text-capitalize my-2"
              >
                <Nav.Link
                  href={`/category/${category}`}
                  as={Link}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  {category}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CategorySidebar;

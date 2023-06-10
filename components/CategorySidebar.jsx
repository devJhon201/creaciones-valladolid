"use client";

import Link from "next/link";
import {  useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";

const CategorySidebar = ({ categories }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className="pe-lg-5 pt-lg-5 text-bg-dark p-3">
      <Button variant="light" className="d-lg-none" onClick={handleShow}>
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
          <ListGroup>
            {categories.map((category) => (
                <ListGroup.Item href={`/category/${category}`} key={category} action as={Link} className="text-capitalize text-bg-dark">
                  {category}
                </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CategorySidebar;

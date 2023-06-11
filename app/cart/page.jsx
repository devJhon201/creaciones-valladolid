"use client";

import CartProduct from "@/components/CartProduct";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "@/components/ProductsContext";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Cart = () => {
  let { selectedProducts } = useContext(ProductsContext);

  const [validated, setValidated] = useState(false);
  const [nombre, setNombre] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [totalOrder, setTotalOrder] = useState(0);

  useEffect(() => {
    let total = 0
    selectedProducts.forEach(({ totalPrice }) => {
      total += totalPrice;
    });
    setTotalOrder(total)
  }, [selectedProducts]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  if (selectedProducts.length < 1) {
    return (
      <Container
        fluid
        as="main"
        className="d-flex flex-coloumn justify-content-center align-items-center h-75"
      >
        <p className="fs-1">Ups... No has agregado nada a tu carrito aún.</p>
      </Container>
    );
  }

  return (
    <Container className="d-flex flex-column">
      {selectedProducts.map((selectedProduct) => (
        <CartProduct
          id={selectedProduct.id}
          name={selectedProduct.name}
          description={selectedProduct.description}
          price={selectedProduct.price}
          image={selectedProduct.image}
          categories={selectedProduct.categories}
          size={selectedProduct.size}
          fabric={selectedProduct.fabric}
          key={
            selectedProduct.id + selectedProduct.size + selectedProduct.fabric
          }
          quantity={selectedProduct.quantity}
          totalPrice={selectedProduct.totalPrice}
        ></CartProduct>
      ))}
      <div>
        <h4>Total Pedido</h4>
        <p className="fs-4">{totalOrder}</p>
      </div>
      <div className="bg-secondary-subtle p-3 rounded my-2">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="calle">
              <Form.Label>Calle</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nombre de la calle"
                value={calle}
                onChange={(e) => setCalle(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="numeroCalle">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                placeholder="Número de calle"
                required
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
              <Form.Text>
                Si la calle no tiene numero escriba S/N o el número cero (0)
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Por favor indique un numero de calle.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="localidad">
              <Form.Label>Localidad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Localidad"
                value={localidad}
                onChange={(e) => setLocalidad(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor indique una localidad para el envío.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="provincia">
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Provincia"
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor indique una provincia para el envío.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="codigoPostal">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Código Postal"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor indique un código postal para el envío.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Aceptar términos y condiciones"
              feedback="Debe aceptar antes de continuar."
              feedbackType="invalid"
            />
          </Form.Group>
          <Button type="submit" variant="success" className="w-100">Pagar {totalOrder}€</Button>
        </Form>
      </div>
    </Container>
  );
};

export default Cart;

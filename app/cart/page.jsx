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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalAddress, setAdditionalAddress] = useState("");
  const [totalOrder, setTotalOrder] = useState(0);

  useEffect(() => {
    let total = 0;
    selectedProducts.forEach(({ totalPrice }) => {
      total += totalPrice;
    });
    setTotalOrder(total);
  }, [selectedProducts]);

  const handleSubmit = async (event) => {
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
      <div className="m-3">
        <h4>Total Pedido</h4>
        <p className="fs-4 d-inline border rounded p-2 text-bg-light">{totalOrder.toFixed(2)}€</p>
      </div>
      <div className="p-3 my-2">
        <Form
          noValidate
          validated={validated}
          action="/api/checkout_sessions"
          method="POST"
          onSubmit={handleSubmit}
        >
          <Row className="mb-3">
            <Col lg={5}>
              <Form.Group md="4" controlId="validationCustom01">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  name="name"
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group md="4" controlId="via">
                <Form.Label>Nombre de la Vía</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nombre de la vía"
                  name="streetName"
                  value={calle}
                  onChange={(e) => setCalle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col lg={3}>
              <Form.Group md="4" controlId="numeroVia">
                <Form.Label>Número Vía</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nº de la Vía"
                  value={numero}
                  name="streetNumber"
                  onChange={(e) => setNumero(e.target.value)}
                />
                <Form.Text className="text-bg-dark">
                  Si la vía no tiene número deje este campo vacío
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={4}>
              <Form.Group md="6" controlId="datosAdicionales">
                <Form.Label>Datos Adicionales</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Planta, Puerta, Escalera, etc..."
                  name="additionalAddress"
                  value={additionalAddress}
                  onChange={(e) => setAdditionalAddress(e.target.value)}
                />
                <Form.Text className="text-bg-dark">
                  Introduzca cualquier dato adicional relativo a su dirección de ser necesario.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group md="6" controlId="localidad">
                <Form.Label>Localidad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Localidad"
                  name="city"
                  value={localidad}
                  onChange={(e) => setLocalidad(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor indique una localidad para el envío.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group md="3" controlId="provincia">
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Provincia"
                  name="province"
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor indique una provincia para el envío.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group md="3" controlId="products">
                <Form.Control
                  name="products"
                  type="hidden"
                  value={JSON.stringify(selectedProducts)}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor indique un código postal para el envío.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
          <Col lg={4}>
              <Form.Group md="3" controlId="codigoPostal">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Código Postal"
                  value={codigoPostal}
                  pattern="[0-9]{5}"
                  name="zipCode"
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor indique un código postal para el envío.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group md="3" controlId="movil">
                <Form.Label>Móvil</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Número de móvil"
                  value={phoneNumber}
                  name="phoneNumber"
                  pattern="(6|7)[0-9]{8}"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor indique un número de móvil válido.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Aceptar términos y condiciones"
              feedback="Debe aceptar antes de continuar."
              feedbackType="invalid"
            />
          </Form.Group>
          <Button role="link" type="submit" variant="success" className="w-100">
            Pagar {totalOrder.toFixed(2)}€
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Cart;

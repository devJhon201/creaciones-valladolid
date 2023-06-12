"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "@/components/ProductsContext";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import useSWR from "swr";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Success = ({ searchParams }) => {
  const { setSelectedProducts } = useContext(ProductsContext);

  useEffect(() => {
    setSelectedProducts([]);
  }, []);

  const {
    data: order,
    error,
    isLoading,
  } = useSWR(`/api/orders/?orderId=${searchParams.orderId}`, fetcher);

  if (searchParams.success) {
    if (isLoading) {
      return (
        <Container>
          <div>Cargando...</div>
        </Container>
      );
    } else if (error) {
      return (
        <Container>
          <div>Error al cargar</div>
        </Container>
      );
    }

    return (
      <Container className="my-2">
        <div>
          <h2>¡Lo tenemos!</h2>
          <p>
            Comenzaremos a procesar tu pedido, en breve lo recibirás en la
            dirección indicada, aquí tienes un resumen de tu pedido:
          </p>
        </div>
        {order.products.map(
          ({
            name,
            size,
            fabric,
            quantity,
            unitPrice,
            description,
            totalPrice,
            image,
            _id,
          }) => (
            <div
              className="row g-2 align-items-center my-2 border-bottom"
              key={_id + size + fabric}
            >
              <div className="col-12 d-flex align-items-center flex-column col-lg-2">
                <img className="img-fluid card-img" src={image} alt="" />
              </div>
              <div className="col-12 d-flex align-items-center flex-column justify-content-center col-lg-2">
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              <div className="col-6 d-flex align-items-center flex-column justify-content-center col-lg-1">
                <h5>Talla</h5>
                <p>{size}</p>
              </div>
              <div className="col-6 d-flex align-items-center flex-column justify-content-center col-lg-1">
                <h5>Material</h5>
                <p>{fabric}</p>
              </div>
              <div className="col-6 d-flex align-items-center flex-column justify-content-center col-lg-2">
                <h5>Precio Unidad</h5>
                <Badge bg="success w-50">{unitPrice.$numberDecimal}€</Badge>
              </div>
              <div className="col-6 d-flex align-items-center flex-column justify-content-center col-lg-2">
                <h6>Unidades</h6>
                <div>
                  <span className="mx-3">{quantity}</span>
                </div>
              </div>
              <div className="col-12 d-flex align-items-center flex-column justify-content-center col-lg-2">
                <h5>Precio Total</h5>
                <p>{totalPrice.$numberDecimal}€</p>
              </div>
            </div>
          )
        )}
        <div>
          <h4>Total Pedido</h4>
          <p className="fs-4">{order.totalPrice.$numberDecimal}€</p>
        </div>
        <div>
          <p>Lo enviaremos a: {order.name}</p>
          <p>
            En la dirección: {order.streetName} {order.streetNumber},{" "}
            {order.city} {order.zipCode}, {order.province}
          </p>
          <p>Número de contacto: {order.phoneNumber}</p>
        </div>
      </Container>
    );
  } else if (searchParams.canceled) {
    return (
      <Container>
        <h2>No se ha podido conpletar tu pedido.</h2>
      </Container>
    );
  }
};

export default Success;

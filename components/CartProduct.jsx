"use client";

import Badge from "react-bootstrap/Badge";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import Button from "react-bootstrap/Button";

const CartProduct = ({
  id,
  name,
  description,
  price,
  image,
  categories,
  size,
  fabric,
  quantity,
  totalPrice
}) => {
  let { removeProductFromCart, changeQuantityFromProduct } =
    useContext(ProductsContext);
  const [quantityState, setQuantityState] = useState(quantity);
  useEffect(() => {
    changeQuantityFromProduct(id, size, fabric, quantityState);
  }, [quantityState]);

  return (
    <div className="row g-2 align-items-center my-2 border-bottom">
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
        <Badge bg="success w-50">{price}€</Badge>
      </div>
      <div className="col-6 d-flex align-items-center flex-column justify-content-center col-lg-2">
        <h6>Unidades</h6>
        <div>
          <Button
            variant="dark"
            onClick={() => {
              quantityState > 0
                ? setQuantityState((prev) => prev - 1)
                : setQuantityState(0);
            }}
          >
            -
          </Button>
          <span className="mx-3">{quantityState}</span>
          <Button
            variant="dark"
            onClick={() => {
              setQuantityState((prev) => prev + 1);
            }}
          >
            +
          </Button>
        </div>
      </div>
      <div className="col-12 d-flex align-items-center flex-column justify-content-center col-lg-2">
        <h5>Precio Total</h5>
        <p>{totalPrice}€</p>
      </div>
      <div className="col-12 d-flex align-items-center flex-column justify-content-center col-lg-2 my-2">
        <Button
          variant="danger"
          onClick={() => {
            removeProductFromCart(id, size, fabric);
          }}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default CartProduct;

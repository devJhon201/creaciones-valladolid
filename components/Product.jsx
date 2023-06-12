"use client";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import ErrorMessage from "./ErrorMessage";
import Button from "react-bootstrap/Button";

const Product = ({
  name,
  description,
  price,
  sizes,
  fabrics,
  image,
  categories,
  id,
}) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFabric, setSelectedFabric] = useState("");
  const [priceFabric, setPriceFabric] = useState(0);
  const [priceSize, setPriceSize] = useState(0);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const { addProductToCart } = useContext(ProductsContext);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState('');

  useEffect(() => {
    price = Number(price);
    setUpdatedPrice(price + priceFabric + priceSize);
  }, [priceFabric, priceSize]);

  function addedMessage () {
    setAdded('Agregado al carrito')

    setTimeout(() => {
      setAdded('')
    }, 3000)
  }

  function handleSelectFabric(e) {
    if (!e.target.value) {
      setSelectedFabric('')
      setPriceFabric(0);
      return;
    }
    setSelectedFabric(e.target.value);
    let [{ plusPrice }] = fabrics.filter(
      (fabric) => fabric.fabricName == e.target.value
    );
    plusPrice = Number(plusPrice.$numberDecimal);
    setPriceFabric(plusPrice);
  }

  function handleSelectSize(e) {
    if (!e.target.value) {
      setSelectedSize('')
      setPriceSize(0);
      return;
    }
    setSelectedSize(e.target.value);

    let [{ plusPrice }] = sizes.filter(
      (size) => size.sizeName == e.target.value
    );
    plusPrice = Number(plusPrice.$numberDecimal);
    setPriceSize(plusPrice);
  }

  function handleAddToCart() {
    if (!selectedFabric) {
      setError("Debe seleccionar el material deseado.");
      return;
    }
    if (!selectedSize) {
      setError("Debe seleccionar la talla deseada.");
      return;
    }
    if(!quantity) {
      setError('Debe seleccionar una cantidad.');
      return
    }
    setError("");

    const productToAdd = {
      id,
      name,
      description,
      price: updatedPrice,
      image,
      categories,
      size: selectedSize,
      fabric: selectedFabric,
      quantity,
      totalPrice: Number((updatedPrice * quantity).toFixed(2))
    };

    addProductToCart(productToAdd);

    setQuantity(1);
    addedMessage()
  }

  return (
    <div className="col-12 col-lg-4 my-2">
      <Card className="p-2 my-2 w-auto h-100">
        <Card.Header className="h-100">
          <Card.Title>
            <h3>{name}</h3>
          </Card.Title>
        </Card.Header>
        <img className="img-fluid card-img" src={image} alt="" />
        <p className="mt-2">
          {categories.map((category) => (
            <span key={category} className="mx-1">
              <Badge
                bg="dark"
                href={`/category/${category}`}
                className="text-capitalize text-decoration-none"
                as={Link}
              >
                {category}
              </Badge>
            </span>
          ))}
        </p>
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Text>{description}</Card.Text>
          <ErrorMessage error={error}></ErrorMessage>
          <div className="d-flex m-3">
            <Form.Select
              size="sm"
              className="mx-1 w-auto"
              onChange={handleSelectSize}
            >
              <option value="">Talla</option>
              {sizes.map((size) => (
                <option
                  className="text-capitalize"
                  value={size.sizeName}
                  key={size._id}
                >
                  {size.sizeName}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              size="sm"
              className="mx-1 w-auto"
              onChange={handleSelectFabric}
            >
              <option value="">Material</option>
              {fabrics.map((fabric) => (
                <option
                  className="text-capitalize"
                  value={fabric.name}
                  key={fabric._id}
                >
                  {fabric.fabricName}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="m-2 d-flex flex-column justify-content-center align-items-center">
            <h6>Unidades</h6>
            <div>
              <Button
                variant="dark"
                onClick={() => {
                  quantity > 0
                    ? setQuantity((prev) => prev - 1)
                    : setQuantity(0);
                }}
              >
                -
              </Button>
              <span className="mx-3">{quantity}</span>
              <Button
                variant="dark"
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                }}
              >
                +
              </Button>
            </div>
          </div>
          <Badge className="fs-1" bg="success">
          {(updatedPrice * quantity).toFixed(2)}€
          </Badge>
        </Card.Body>
        {added ? <div className="alert alert-success text-center" role="alert">{added}</div> : null}
        <Card.Link
          onClick={handleAddToCart}
          as="button"
          className="btn btn-primary"
        >
          Comprar
        </Card.Link>
      </Card>
    </div>
  );
};

export default Product;

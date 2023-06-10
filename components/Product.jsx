"use client";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import ErrorMessage from "./ErrorMessage";

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
  const { setSelectedProducts, selectedProducts } = useContext(ProductsContext);
  const [error, setError] = useState("");

  useEffect(() => {
    price = Number(price);
    setUpdatedPrice(price + priceFabric + priceSize);
  }, [priceFabric, priceSize]);

  function handleSelectFabric(e) {
    if (!e.target.value) {
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
    setError("");
    setSelectedProducts((prev) => [
      ...prev,
      {
        id,
        name,
        description,
        price: updatedPrice,
        image,
        categories,
        size: selectedSize,
        fabric: selectedFabric,
      },
    ]);
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
          <Badge className="fs-1" bg="success">
            {updatedPrice}€
          </Badge>
        </Card.Body>

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

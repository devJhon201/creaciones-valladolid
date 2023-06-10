"use client";

import Image from "next/image";
import CamisaEjemplo from "../public/images/camiseta-ejemplo.webp";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";

const Product = ({
  name,
  description,
  price,
  sizes,
  fabrics,
  image,
  categories,
}) => {
  return (
    <div className="col-12 col-lg-4 my-2">
      <Card className="p-2 my-2 w-auto h-100">
        <Card.Header className="h-100">
          <Card.Title>
            <h3>{name}</h3>
          </Card.Title>
        </Card.Header>
        <img className="img-fluid card-img" src={image} alt="" />
        <Card.Body>
          <Card.Text>{description}</Card.Text>
          <div className="d-flex m-3">
            <Form.Select aria-label="Default select example" size="sm" className="mx-1 w-auto">
              <option>Talla</option>
              {sizes.map((size) => (
                <option value={size.sizeName} key={size._id}>
                  {size.sizeName}
                </option>
              ))}
            </Form.Select>
            <Form.Select aria-label="Default select example" size="sm" className="mx-1 w-auto">
              <option>Material</option>
              {fabrics.map((fabric) => (
                <option value={fabric.fabricName} key={fabric._id}>
                  {fabric.fabricName}
                </option>
              ))}
            </Form.Select>
          </div>
          <Badge className="fs-1" bg="success">
            {price}€
          </Badge>
        </Card.Body>

        <Card.Link as="button" className="btn btn-primary">
          Comprar
        </Card.Link>
      </Card>
    </div>
  );
};

export default Product;

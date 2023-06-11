"use client";

import CartProduct from "@/components/CartProduct";
import { useContext } from "react";
import { ProductsContext } from "@/components/ProductsContext";
import Container from "react-bootstrap/Container";

const Cart = () => {
  let { selectedProducts} = useContext(ProductsContext);


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
          key={selectedProduct.id + selectedProduct.size + selectedProduct.fabric}
          quantity={selectedProduct.quantity}
        ></CartProduct>
      ))}
    </Container>
  );
};

export default Cart;

"use client";

import { createContext, useState } from "react";

export const ProductsContext = createContext({});

const ProductsContextProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  console.log(selectedProducts)
  return (
    <ProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;

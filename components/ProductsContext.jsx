"use client";

import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const ProductsContext = createContext({});

const ProductsContextProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState("cart", {
    defaultValue: [],
  });

  function addProductToCart(productToAdd) {
    if (selectedProducts.length > 0) {
      for (let index = 0; index < selectedProducts.length; index++) {
        const selectedProduct = selectedProducts[index];

        if (
          selectedProduct.id == productToAdd.id &&
          selectedProduct.size == productToAdd.size &&
          selectedProduct.fabric == productToAdd.fabric
        ) {
          setSelectedProducts((prev) => {
            prev[index].quantity += productToAdd.quantity;
            return [...prev];
          });
          break;
        } else if (index == selectedProducts.length - 1) {
          setSelectedProducts((prev) => [...prev, productToAdd]);
        }
      }
    } else {
      setSelectedProducts([productToAdd]);
    }
  }

  function removeProductFromCart(idToRemove, sizeToRemove, fabricToRemove) {
    setSelectedProducts((prev) =>
      prev.filter(
        ({ id, size, fabric }) =>
          id != idToRemove || size != sizeToRemove || fabric != fabricToRemove
      )
    );
  }

  function changeQuantityFromProduct(
    idToChange,
    sizeToChange,
    fabricToChange,
    quantity
  ) {
    for (let index = 0; index < selectedProducts.length; index++) {
      const selectedProduct = selectedProducts[index];

      if (
        selectedProduct.id == idToChange &&
        selectedProduct.size == sizeToChange &&
        selectedProduct.fabric == fabricToChange
      ) {
        if (quantity == 0) {
          removeProductFromCart(idToChange, sizeToChange, fabricToChange);
        } else {
          setSelectedProducts((prev) => {
            prev[index].quantity = quantity;
            return [...prev];
          });
          break;
        }
      }
    }
  }
  return (
    <ProductsContext.Provider
      value={{
        selectedProducts,
        setSelectedProducts,
        addProductToCart,
        removeProductFromCart,
        changeQuantityFromProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;

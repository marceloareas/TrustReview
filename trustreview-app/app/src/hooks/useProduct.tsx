import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct deve ser usado dentro de ProductProvider");
  }
  return context;
};

export default useProduct;

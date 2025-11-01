import ProductDetailsSection from "../Sections/ProductDetails";
import { Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productService } from "../services";
import type { IProduct } from "../interfaces/Product";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const res = await productService.getProductById(id);
        setProduct(res);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <h2>Produto não encontrado</h2>
      </Box>
    );
  }

  return (
    <Stack
      spacing={8}
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.default",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <ProductDetailsSection id={id ?? ""} product={product} />
    </Stack>
  );
};

export default ProductPage;

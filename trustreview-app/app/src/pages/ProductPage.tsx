import { Box, Stack } from "@mui/material";
import ProductDetailsSection from "../Sections/ProductDetails";
import { useParams } from "react-router-dom";
import ProductReviewSection from "../Sections/ProductReview";
import { useEffect, useState } from "react";
import CreateReviewSection from "../Sections/CreateReview";
import { productService } from "../services";
import type { IProduct } from "../interfaces/Product";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);

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
      spacing={4}
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.default",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <ProductDetailsSection
        product={product}
        isReviewing={isReviewing}
        onReview={() => setIsReviewing(true)}
      />
      {!isReviewing && <ProductReviewSection reviews={product.reviews || []} />}
      {isReviewing && (
        <CreateReviewSection onReview={() => setIsReviewing(false)} />
      )}
    </Stack>
  );
};

export default ProductPage;

import { Box, Stack } from "@mui/material";
import ProductDetailsSection from "../Sections/ProductDetails";
import { products } from "../shared/constants/products";
import { useParams } from "react-router-dom";
import ProductReviewSection from "../Sections/ProductReview";
import { useState } from "react";
import CreateProductSection from "../Sections/CreateProduct";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isReviewing, setIsReviewing] = useState(false);

  const product = products.find((p) => p.id === id);

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
       <ProductDetailsSection product={product} isReviewing={isReviewing} onReview={() => setIsReviewing(true)} />
      {!isReviewing && (
        <ProductReviewSection reviews={product.reviews || []} />
      )}
      {isReviewing && (
        <CreateProductSection onReview={() => setIsReviewing(false)}/>
      )}
    
    </Stack>
  );
};

export default ProductPage;

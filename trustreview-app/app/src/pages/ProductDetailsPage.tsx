import { Box, Stack } from "@mui/material";
import ProductDetailsSection from "../Sections/ProductDetails";
import { products } from "../shared/constants/products";
import { useParams } from "react-router-dom";
import ProductReviewSection from "../Sections/ProductReview";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

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
      <ProductDetailsSection product={product} />
      <ProductReviewSection reviews={product.reviews || []} />
    </Stack>
  );
};

export default ProductDetailsPage;

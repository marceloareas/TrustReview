import { Box } from "@mui/material";
import ProductDetails from "../Sections/ProductDetails";
import { products } from "../shared/constants/products";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  let product = products.find((p) => p.id === id);

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
      <ProductDetails product={product} />
    </Box>
  );
};

export default ProductDetailsPage;

import ProductDetailsSection from "../Sections/ProductDetails";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

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
      <ProductDetailsSection id={id ?? ""} />
    </Stack>
  );
};

export default ProductPage;

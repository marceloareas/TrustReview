import useProduct from "../hooks/useProduct";
import CompareProductsSection from "../Sections/CompareProducts";
import { Stack } from "@mui/material";

const CompareProductsPage = () => {
  const { products } = useProduct();

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.default",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <CompareProductsSection products={products || []} />
    </Stack>
  );
};

export default CompareProductsPage;

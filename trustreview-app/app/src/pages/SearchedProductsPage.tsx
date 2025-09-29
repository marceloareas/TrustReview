import { Box } from "@mui/material";
import SearchedProducts from "../Sections/SearchedProducts";

const SearchedProductsPage = () => {
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
      <SearchedProducts />
    </Box>
  );
};

export default SearchedProductsPage;

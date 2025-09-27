import { Box } from "@mui/material";
import SearchedProducts from "../Sections/SearchedProducts";

const SearchedProductsPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 64px)",
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

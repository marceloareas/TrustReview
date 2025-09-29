import { Stack } from "@mui/material";
import SearchedProducts from "../Sections/SearchedProducts";

const SearchedProductsPage = () => {
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
      <SearchedProducts />
    </Stack>
  );
};

export default SearchedProductsPage;

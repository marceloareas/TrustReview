import { Box, Container } from "@mui/material";
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
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <SearchedProducts />
      </Container>
    </Box>
  );
};

export default SearchedProductsPage;

import { Box, Container, Stack, Typography } from "@mui/material";
import AppTitle from "../../components/AppTitle";
import Search from "../../components/Search";
import SearchIcon from "../../assets/icons/Search.svg";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import { useEffect } from "react";
import useProduct from "../../hooks/useProduct";

const SearchSection = () => {
  const navigate = useNavigate();
  const { products, loadProducts } = useProduct();
  const { searchTerm, setSearchTerm } = useSearch(products, ["name"]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.length > 0)
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await loadProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [loadProducts]);

  return (
    <Container maxWidth="md">
      <Stack
        flex={1}
        spacing={4}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
        mt={"-64px"}
      >
        <AppTitle />
        <Box component="img" src={SearchIcon} width={64} />
        <Typography variant="h6">Busque um produto para avaliar</Typography>
        <Search
          value={searchTerm}
          onChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
        />
      </Stack>
    </Container>
  );
};

export default SearchSection;

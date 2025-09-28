import { Box, Container, Stack, Typography } from "@mui/material";
import AppTitle from "../../components/AppTitle";
import Search from "../../components/Search";
import SearchIcon from "../../assets/icons/Search.svg";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import { products } from "../../shared/constants/products";

const SearchSection = () => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useSearch(products, ["name"]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.length > 0)
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <Container maxWidth="md">
      <Stack
        flex={1}
        spacing={4}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
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

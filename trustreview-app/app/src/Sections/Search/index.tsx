import { Box, Container, Stack, Typography } from "@mui/material";
import AppTitle from "../../components/AppTitle";
import Search from "../../components/Search";
import SearchIcon from "../../assets/icons/Search.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Search submitted:", searchValue);
    navigate("/products");
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
          value={searchValue}
          onChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
        />
      </Stack>
    </Container>
  );
};

export default SearchSection;

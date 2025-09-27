import { Box, Stack, Typography } from "@mui/material";
import AppTitle from "../../components/AppTitle";
import Search from "../../components/Search";
import SearchIcon from "../../assets/icons/Search.svg";
import { useState } from "react";

const SearchSection = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Stack
      flex={1}
      spacing={3}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
    >
      <AppTitle />
      <Box component="img" src={SearchIcon} width={64} />
      <Typography variant="h6">Busque um produto para avaliar</Typography>
      <Search value={searchValue} onChange={handleSearchChange} />
    </Stack>
  );
};

export default SearchSection;

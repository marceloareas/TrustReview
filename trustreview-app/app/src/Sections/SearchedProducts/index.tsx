import { Stack } from "@mui/material";
import ProductTitle from "../../components/ProductTitle";
import ProductCardList from "../../components/ProductCardList";
import { products } from "../../shared/constants/products";
import Search from "../../components/Search";
import { useState } from "react";

const SearchedProducts = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Search submitted:", searchValue);
  };

  return (
    <Stack
      flex={1}
      spacing={3}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
    >
      <Search
        value={searchValue}
        onChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />
      <ProductTitle />
      <ProductCardList productList={products} />
    </Stack>
  );
};

export default SearchedProducts;

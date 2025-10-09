import { Container, Stack } from "@mui/material";
import { useSearch } from "../../hooks/useSearch";
import { useQuery } from "../../hooks/useQuery";
import { useEffect, useState } from "react";
import { productService } from "../../services";
import type { IProduct } from "../../interfaces/Product";
import ProductTitle from "../../components/Product/ProductTitle";
import ProductCardGridList from "../../components/Product/ProductCardGridList";
import Search from "../../components/Search";

const SearchedProducts = () => {
  const query = useQuery();
  const initialSearch = query.get("search") || "";
  const [products, setProducts] = useState<IProduct[]>([]);
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(
    products,
    ["name"],
    initialSearch,
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productService.getProducts();
        setProducts(res);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container maxWidth="xl">
      <Stack
        flex={1}
        spacing={4}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Search value={searchTerm} onChange={handleSearchChange} />
        <ProductTitle />
        <ProductCardGridList productList={filteredItems} />
      </Stack>
    </Container>
  );
};

export default SearchedProducts;

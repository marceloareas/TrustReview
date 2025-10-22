import { Container, Stack } from "@mui/material";
import ProductTitle from "../../components/Product/ProductTitle";
import ProductCardList from "../../components/Product/ProductCardGridList";
import Search from "../../components/Search";
import { useSearch } from "../../hooks/useSearch";
import { useQuery } from "../../hooks/useQuery";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productService } from "../../services";
import type { IProduct } from "../../interfaces/Product";

const SearchedProducts = () => {
  const query = useQuery();
  const navigate = useNavigate();
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

  const handleClickProduct = (id: string) => {
    navigate(`/products/${id}`);
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
        <ProductCardList
          productList={filteredItems}
          onClick={handleClickProduct}
        />
      </Stack>
    </Container>
  );
};

export default SearchedProducts;

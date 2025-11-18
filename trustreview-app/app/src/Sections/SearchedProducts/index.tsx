import { Container, Stack } from "@mui/material";
import ProductTitle from "../../components/Product/ProductTitle";
import ProductCardList from "../../components/Product/ProductCardGridList";
import Search from "../../components/Search";
import { useSearch } from "../../hooks/useSearch";
import { useQuery } from "../../hooks/useQuery";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useProduct from "../../hooks/useProduct";

const SearchedProducts = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const initialSearch = query.get("search") || "";
  const { products } = useProduct();
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

  const { loadProducts } = useProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await loadProducts();
        // loadProducts updates context; we'll read products from it if needed in the future
        // keep local setProducts for compatibility with useSearch
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [loadProducts]);

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

import { Container, Stack } from "@mui/material";
import ProductTitle from "../../components/Product/ProductTitle";
import ProductCardList from "../../components/Product/ProductCardList";
import { products } from "../../shared/constants/products";
import Search from "../../components/Search";
import { useSearch } from "../../hooks/useSearch";
import { useQuery } from "../../hooks/useQuery";
import { useNavigate } from "react-router-dom";

const SearchedProducts = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const initialSearch = query.get("search") || "";
    const { searchTerm, setSearchTerm, filteredItems } = useSearch(
        products,
        ["name"],
        initialSearch
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleClickProduct = (id: string) => {
        navigate(`/products/${id}`);
    };

    return (
        <Container
            maxWidth="xl"
            sx={{ height: "100%", width: "100%", py: 4 }}
        >
            <Stack
                flex={1}
                spacing={4}
                justifyContent={"center"}
                alignItems={"flex-start"}
            >
                <Search value={searchTerm} onChange={handleSearchChange} />
                <ProductTitle />
                <ProductCardList productList={filteredItems} onClick={handleClickProduct} />
            </Stack>
        </Container>
    );
};

export default SearchedProducts;

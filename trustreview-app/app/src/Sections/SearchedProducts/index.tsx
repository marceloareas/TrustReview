import { Container, Stack } from "@mui/material";
import StylizedTitle from "../../components/Product/StylizedTitle";
import ProductCardList from "../../components/Product/ProductCardGridList";
import Search from "../../components/Search";
import { useSearch } from "../../hooks/useSearch";
import { useQuery } from "../../hooks/useQuery";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useProduct from "../../hooks/useProduct";
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type { ITag } from "../../interfaces/Product";

const SearchedProducts = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const initialSearch = query.get("search") || "";
  const { products, loadProducts, loadProductsByTags } = useProduct();
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(
    products,
    ["name"],
    initialSearch,
  );

  const [availableTags, setAvailableTags] = useState<ITag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClickProduct = (id: string) => {
    navigate(`/products/${id}`);
  };

  const handleTagChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedTags(typeof value === "string" ? value.split(",") : value);
  };

  // Carrega as tags disponíveis
  useEffect(() => {
    fetch("/api/v1/tags")
      .then((res) => res.json())
      .then(setAvailableTags)
      .catch(console.error);
  }, []);

  // Re-busca produtos sempre que as tags selecionadas mudarem
  useEffect(() => {
    if (selectedTags.length > 0) {
      loadProductsByTags(selectedTags);
    } else {
      loadProducts();
    }
  }, [selectedTags]);

  return (
    <Container maxWidth="xl">
      <Stack flex={1} spacing={4} justifyContent="center" alignItems="flex-start">
        <Search value={searchTerm} onChange={handleSearchChange} />

        {/* Filtro por tags — lista suspensa */}
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl sx={{ minWidth: 250 }} size="small">
            <InputLabel>Filtrar por tags</InputLabel>
            <Select
              multiple
              value={selectedTags}
              onChange={handleTagChange}
              input={<OutlinedInput label="Filtrar por tags" />}
              renderValue={(selected) => (
                <Stack direction="row" spacing={0.5} flexWrap="wrap">
                  {selected.map((id) => {
                    const tag = availableTags.find((t) => t.id === id);
                    return <Chip key={id} label={tag?.name} size="small" />;
                  })}
                </Stack>
              )}
            >
              {availableTags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedTags.length > 0 && (
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={() => setSelectedTags([])}
            >
              Limpar filtros
            </Button>
          )}
        </Stack>

        <StylizedTitle title="Produtos" />
        <ProductCardList
          productList={filteredItems}
          onClick={handleClickProduct}
        />
      </Stack>
    </Container>
  );
};

export default SearchedProducts;
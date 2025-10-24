/**
 * ProductCardGridList
 *
 * Propósito:
 *  Exibir uma grade (grid) de cartões de produtos (`ProductCard`) com comportamento responsivo.
 *  Caso não existam produtos, mostra uma mensagem informativa e um botão para criar um novo produto.
 *
 * Uso:
 *  <ProductCardGridList
 *    productList={listaDeProdutos}
 *    onClick={(id) => console.log("Produto clicado:", id)}
 *  />
 *
 * Entradas (props):
 *  - productList: IProduct[] — lista de produtos a serem exibidos.
 *  - onClick: (id: string) => void — função chamada ao clicar em um cartão de produto.
 *
 * Comportamento:
 *  - Se `productList` estiver vazia:
 *      • Exibe a mensagem “Nenhum produto encontrado”.
 *      • Mostra um botão (`AddBox`) que, ao ser clicado, redireciona para a rota `/createProduct`
 *        usando `useNavigate()` do `react-router-dom`.
 *  - Caso existam produtos:
 *      • Renderiza uma grade (`Grid`) de cartões (`ProductCard`), responsiva conforme o tamanho da tela.
 *      • Cada `ProductCard` recebe os dados do produto e o evento `onClick`.
 *      • O layout usa `Stack` para centralizar os cartões horizontalmente.
 *
 * Layout:
 *  - Usa `Grid` do Material UI com espaçamento (`spacing={2}`) e altura máxima ajustável.
 *  - Scroll vertical habilitado (`overflowY: "auto"`) para listas longas.
 *  - Cada célula da grade adapta-se responsivamente com tamanhos: xs=12, sm=6, md=4, lg=3, xl=2.
 *
 * Observações:
 *  - Utiliza `ProductCard` como componente filho para exibir cada produto.
 *  - A função `onClick` deve lidar com o id do produto (ex.: abrir detalhes ou editar).
 *  - A11y: o botão de adicionar possui `aria-label="Add"`.
 *
 * Dependências:
 *  - @mui/material: Box, Grid, IconButton, Stack, Typography.
 *  - @mui/icons-material: AddBox.
 *  - react-router-dom: useNavigate.
 *  - ../ProductCard: componente de cartão individual.
 *  - interfaces/Product: tipagem `IProduct`.
 */
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import type { IProduct } from "../../../interfaces/Product";
import ProductCard from "../ProductCard";
import { AddBox } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface IProductCardListProps {
  productList: IProduct[];
  onClick: (id: string) => void;
}

const ProductCardGridList = ({
  productList,
  onClick,
}: IProductCardListProps) => {
  const navigate = useNavigate();
  if (productList.length === 0) {
    return (
      <Stack
        width={"100%"}
        height={"60vh"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={4}
      >
        <Typography variant="h6">Nenhum produto encontrado</Typography>
        <Stack alignItems={"center"} justifyContent={"center"} spacing={1}>
          <Box>
            <IconButton
              size="large"
              aria-label="Add"
              color="secondary"
              sx={{ color: "secondary.main" }}
              onClick={() => navigate("/createProduct")}
            >
              <AddBox sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
          <Typography variant="h6">Crie um produto</Typography>
        </Stack>
      </Stack>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      py={2}
      sx={{
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        px: 1,
        maxHeight: { xs: "80vh", md: "60vh" },
      }}
    >
      {productList.map((product) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={product.id}>
          <Stack direction={"row"} justifyContent={"center"}>
            <ProductCard
              key={product.id}
              productData={product}
              onClick={() => onClick(product.id || "")}
            />
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCardGridList;

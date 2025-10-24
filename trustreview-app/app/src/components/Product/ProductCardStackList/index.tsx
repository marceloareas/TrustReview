/**
 * ProductCardStackList
 *
 * Propósito:
 *  Exibe uma lista horizontal de cartões de produtos com rolagem lateral.
 *  É ideal para seções como “Produtos recomendados” ou “Mais visualizados”.
 *
 * Uso:
 *  <ProductCardStackList
 *    productList={products}
 *    onClick={(id) => console.log("Produto clicado:", id)}
 *  />
 *
 * Entradas:
 *  - productList: array de produtos do tipo IProduct, contendo os dados a exibir.
 *  - onClick: função chamada ao clicar em um card; recebe o ID do produto clicado.
 *
 * Comportamento:
 *  - Quando a lista está vazia, exibe uma mensagem centralizada (“Nenhum produto encontrado”).
 *  - Quando há produtos, renderiza os cards lado a lado, permitindo rolagem horizontal.
 *  - Cada card é clicável e dispara a função `onClick` passando o ID do produto.
 * Notas:
 *  - Depende de @mui/material e do componente interno `ProductCard`.
 *  - Suporta rolagem horizontal automática em listas longas.
 *  - A11y: considerar adicionar botões de navegação (“anterior/próximo”) para acessibilidade melhorada.
 */
import { Box, Stack, Typography } from "@mui/material";
import type { IProduct } from "../../../interfaces/Product";
import ProductCard from "../ProductCard";

interface IProductCardListProps {
  productList: IProduct[];
  onClick: (id: string) => void;
}

const ProductCardStackList = ({
  productList,
  onClick,
}: IProductCardListProps) => {
  if (productList.length === 0) {
    return (
      <Stack
        width={"100%"}
        height={"30vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box>
          <Typography>Nenhum produto encontrado</Typography>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack
      direction={"row"}
      spacing={2}
      py={2}
      sx={{
        width: "100%",
        overflowX: "auto",
        paddingRight: 1,
        marginRight: -1,
        pl: 0.5,
      }}
    >
      {productList.map((product) => (
        <ProductCard
          key={product.id}
          productData={product}
          onClick={() => onClick(product.id || "")}
        />
      ))}
    </Stack>
  );
};

export default ProductCardStackList;

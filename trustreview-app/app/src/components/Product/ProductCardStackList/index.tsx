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

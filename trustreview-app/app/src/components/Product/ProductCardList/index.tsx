import { Box, Grid, Stack, Typography } from "@mui/material";
import type { IProduct } from "../../../interfaces/Product";
import ProductCard from "../ProductCard";

const ProductCardList = ({
  productList,
  onClick,
}: {
  productList: Partial<IProduct>[];
  onClick: (id: string) => void;
}) => {
  if (productList.length === 0) {
    return (
      <Stack
        width={"100%"}
        height={"60vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box>
          <Typography>Nenhum produto encontrado.</Typography>
        </Box>
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
        paddingRight: 1,
        marginRight: -1,
        pl: 0.5,
        maxHeight: "60vh",
      }}
    >
      {productList.map((product) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={product.id}>
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

export default ProductCardList;

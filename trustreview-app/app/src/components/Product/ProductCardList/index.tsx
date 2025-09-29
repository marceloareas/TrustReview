import { Box, Grid, Stack, Typography } from "@mui/material";
import type { IProduct } from "../../../interfaces/Product";
import ProductCard from "../ProductCard";

const ProductCardList = ({
  productList,
}: {
  productList: Partial<IProduct>[];
}) => {

  if (productList.length === 0) {
    return (
      <Stack
        width={"100%"}
        height={'60vh'}
        alignItems={"center"}
        justifyContent={'center'}
      >
        <Box>
          <Typography>
            No products found.
          </Typography>
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
        paddingRight: 2,
        marginRight: -2,
        maxHeight: "60vh",
      }}
    >
      {productList.map((product) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={product.id}>
          <Stack direction={"row"} justifyContent={"center"}>
            <ProductCard key={product.id} productData={product} />
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCardList;

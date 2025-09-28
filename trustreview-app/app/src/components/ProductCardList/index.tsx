import { Grid, Stack } from "@mui/material";
import type { IProduct } from "../../interfaces/Product";
import ProductCard from "../ProductCard";

const ProductCardList = ({
  productList,
}: {
  productList: Partial<IProduct>[];
}) => {
  return (
    <Grid
      container
      spacing={2}
      py={2}
      sx={{
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
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

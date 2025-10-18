import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import type { IProduct } from "../../../interfaces/Product";
import ProductCard from "../ProductCard";
import { AddBox } from "@mui/icons-material";

interface IProductCardListProps {
  productList: IProduct[];
  onClick: (id: string) => void;
}

const ProductCardGridList = ({
  productList,
  onClick,
}: IProductCardListProps) => {
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
        paddingRight: 1,
        marginRight: -1,
        pl: 0.5,
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

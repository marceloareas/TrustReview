import { Box, Stack, Typography } from "@mui/material";
import type { IProduct } from "../../../interfaces/Product";
import ProductCard from "../ProductCard";
import { useNavigate } from "react-router-dom";

const ProductCardStackList = ({
  productList,
}: {
  productList: Partial<IProduct>[];
}) => {
  const navigate = useNavigate();

  const handleClickProduct = (id: string) => {
    navigate(`/products/${id}`);
  };

  if (productList.length === 0) {
    return (
      <Stack
        width={"100%"}
        height={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box>
          <Typography>Nenhum produto semelhante encontrado.</Typography>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack
      spacing={2}
      py={2}
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "hidden",
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
          onClick={() => handleClickProduct(product.id || "")}
        />
      ))}
    </Stack>
  );
};

export default ProductCardStackList;

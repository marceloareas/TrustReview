import { Stack, Typography } from "@mui/material";
import ProductCardStackList from "../../../components/Product/ProductCardStackList";
import type { IProduct } from "../../../interfaces/Product";

const RelatedProducts = ({
  products,
  onClick,
}: {
  products: IProduct[];
  onClick: (id: string) => void;
}) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Typography variant="h4" fontWeight={100}>
        Produtos Relacionados
      </Typography>
      <ProductCardStackList productList={products} onClick={onClick} />
    </Stack>
  );
};

export default RelatedProducts;

import { Stack, Typography } from "@mui/material";
import { type IProduct } from "../../interfaces/Product";

const ProductHeader = ({ product }: { product: IProduct }) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" fontWeight={100}>
        {product?.name}
      </Typography>
    </Stack>
  );
};

export default ProductHeader;

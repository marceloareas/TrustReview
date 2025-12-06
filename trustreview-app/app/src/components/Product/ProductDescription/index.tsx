import { Stack, Typography } from "@mui/material";
import { type IProduct } from "../../../interfaces/Product";

interface ProductDescriptionProps {
  product: IProduct;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Typography variant="body2" color="text.tertiary">
        {product?.createdAt &&
          `Criado em: ${new Date(product.createdAt).toLocaleString("pt-BR")}`}
        {product?.updatedAt &&
          ` | Atualizado em: ${new Date(product.updatedAt).toLocaleString("pt-BR")}`}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ whiteSpace: "pre-line" }}
      >
        {product?.description}
      </Typography>
    </Stack>
  );
};

export default ProductDescription;

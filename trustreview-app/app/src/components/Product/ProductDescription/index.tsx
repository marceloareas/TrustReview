import { Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
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

      {product?.summary?.trim() ? (
        <Paper
          variant="outlined"
          sx={(theme) => ({
            width: "100%",
            p: 2,
            borderColor: alpha(theme.palette.primary.main, 0.65),
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.1 : 0.04
            ),
            boxShadow: `0 0 0 1px ${alpha(
              theme.palette.primary.main,
              0.18
            )}, 0 0 18px ${alpha(theme.palette.primary.main, 0.22)}`,
          })}
        >
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ lineHeight: 1.2 }}
            >
              Resumo gerado por IA com base nas opiniões dos usuários
            </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line" }}
          >
            {product.summary}
          </Typography>
          </Stack>
        </Paper>
      ) : null}

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

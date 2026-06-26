import { Grid, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { IProduct } from "../../../interfaces/Product";
import ProductMeta from "../../../components/ProductMeta";
import ProductHeader from "../../../components/ProductHeader";
import ProductImage from "../../../components/Product/ProductImage";
import ProsCons from "./ProsCons";

interface ComparisonItemProps {
  product: IProduct;
}

const ComparisonItem = ({ product }: ComparisonItemProps) => {
  return (
    <Grid size={{ xs: 12 }}>
      <Stack
        justifyContent={"center"}
        alignItems={{ xs: "center", md: "flex-start" }}
      >
        <Stack spacing={2}>
          <ProductImage imageUrl={product.imageUrl || ""} name={product.name} />
          <ProductHeader product={product} />
          <ProductMeta product={product} reviewsLink />
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
                    Resumo
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
          </Stack>
          <ProsCons product={product} />
        </Stack>
      </Stack>
    </Grid>
  );
};

export default ComparisonItem;

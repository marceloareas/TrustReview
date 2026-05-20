import { Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { IProduct } from "../../../interfaces/Product";

interface AspectCardProps {
  title: string;
  text?: string;
  color: "success" | "error";
}

const AspectCard = ({ title, text, color }: AspectCardProps) => (
  <Paper
    variant="outlined"
    sx={(theme) => ({
      flex: 1,
      width: "100%",
      p: 2,
      borderColor: alpha(theme.palette[color].main, 0.65),
      backgroundColor: alpha(
        theme.palette[color].main,
        theme.palette.mode === "dark" ? 0.1 : 0.05
      ),
      boxShadow: `0 0 0 1px ${alpha(
        theme.palette[color].main,
        0.18
      )}, 0 0 18px ${alpha(theme.palette[color].main, 0.22)}`,
    })}
  >
    <Stack spacing={1}>
      <Typography
        variant="subtitle2"
        sx={{ color: `${color}.main`, lineHeight: 1.2 }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ whiteSpace: "pre-line" }}
      >
        {text?.trim() || "Resumo ainda não disponível para este produto."}
      </Typography>
    </Stack>
  </Paper>
);

const ProsCons = ({ product }: { product: IProduct }) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      width="100%"
      alignItems="stretch"
    >
      <AspectCard
        title="Prós segundo a IA"
        text={product.prosSummary}
        color="success"
      />
      <AspectCard
        title="Contras segundo a IA"
        text={product.consSummary}
        color="error"
      />
    </Stack>
  );
};

export default ProsCons;

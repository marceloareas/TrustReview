import type { IProduct } from "../../interfaces/Product";
import { Container, Stack, Typography } from "@mui/material";
import StylizedTitle from "../../components/Product/StylizedTitle";
import CompareSelectors from "./components/CompareSelectors";
import { useState } from "react";

const CompareProductsSection = ({ products }: { products: IProduct[] }) => {
  const [firstValue, setFirstValue] = useState<string | null>(null);
  const [secondValue, setSecondValue] = useState<string | null>(null);

  return (
    <Container maxWidth="xl">
      <Stack spacing={8} my={4} alignItems="center">
        <StylizedTitle title="Comparar Produtos" />
        <CompareSelectors
          products={products}
          firstValue={firstValue}
          secondValue={secondValue}
          onFirstChange={setFirstValue}
          onSecondChange={setSecondValue}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontStyle: "italic",
            textAlign: "center",
            maxWidth: "60ch",
          }}
        >
          O resumo, prós e contras dos produtos são gerados por IA com base
          nas opiniões dos usuários.
        </Typography>
      </Stack>
    </Container>
  );
};

export default CompareProductsSection;

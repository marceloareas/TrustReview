import { Box, Grid, Stack } from "@mui/material";
import ProductSelect from "../../../components/MultiSelect/ProductSelect";
import darkVs from "../../../assets/icons/darkVs.png";
import type { IProduct } from "../../../interfaces/Product";
import { useEffect, useState } from "react";
import useProduct from "../../../hooks/useProduct";
import ComparisonItem from "./ProductsComparison";

interface CompareSelectorsProps {
  products: IProduct[];
  firstValue: string | null;
  secondValue: string | null;
  onFirstChange: (newValue: string | null) => void;
  onSecondChange: (newValue: string | null) => void;
}

const CompareSelectors = ({
  products,
  firstValue,
  secondValue,
  onFirstChange,
  onSecondChange,
}: CompareSelectorsProps) => {
  const { getProductById } = useProduct();
  const [firstProduct, setFirstProduct] = useState<IProduct | null>(null);
  const [secondProduct, setSecondProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const [first, second] = await Promise.all([
        firstValue ? getProductById(firstValue) : null,
        secondValue ? getProductById(secondValue) : null,
      ]);

      setFirstProduct(first);
      setSecondProduct(second);
    };

    fetchProducts();
  }, [firstValue, secondValue, getProductById]);

  return (
    <Grid
      container
      spacing={4}
      alignItems="stretch"
      sx={{ width: "100%", pb: 8 }}
    >
      <Grid size={{ xs: 12, md: 5.5 }}>
        <Stack spacing={6} height="100%" pb={4}>
          <ProductSelect
            options={products.filter((p) => p.id !== secondValue)}
            onChange={onFirstChange}
          />
          {firstProduct && <ComparisonItem product={firstProduct} />}
        </Stack>
      </Grid>
      <Grid
        size={{ xs: 12, md: 1 }}
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        pt={1}
      >
        <Box
          component={"img"}
          src={darkVs}
          alt="VS"
          sx={{ width: 42, height: 42, objectFit: "contain" }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 5.5 }}>
        <Stack spacing={6} height="100%" pb={4}>
          <ProductSelect
            options={products.filter((p) => p.id !== firstValue)}
            onChange={onSecondChange}
          />
          {secondProduct && <ComparisonItem product={secondProduct} />}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CompareSelectors;

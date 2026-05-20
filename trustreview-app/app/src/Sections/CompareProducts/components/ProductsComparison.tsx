import { Grid, Stack } from "@mui/material";
import type { IProduct } from "../../../interfaces/Product";
import ProductMeta from "../../../components/ProductMeta";
import ProductHeader from "../../../components/ProductHeader";
import ProductImage from "../../../components/Product/ProductImage";
import ProductDescription from "../../../components/Product/ProductDescription";
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
          <ProductDescription product={product} showDescription={false} />
          <ProsCons product={product} />
        </Stack>
      </Stack>
    </Grid>
  );
};

export default ComparisonItem;

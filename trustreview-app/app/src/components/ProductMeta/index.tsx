import { Stack, Rating, Typography } from "@mui/material";
import TagsList from "../Tag/TagList";
import { type IProduct } from "../../interfaces/Product";

const ProductMeta = ({ product }: { product: IProduct }) => {
  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={"flex-start"}
        spacing={1}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Rating
            name="Product rating"
            value={product.overallRating}
            precision={0.5}
            readOnly
          />
          <Typography variant="body2">
            {product?.overallRating?.toFixed(1)}
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.tertiary">
          ({product?.reviewsCount} reviews)
        </Typography>
      </Stack>

      <Typography variant="body1" fontWeight={600}>
        Tags
      </Typography>
      <TagsList tags={product.tags || []} />
    </Stack>
  );
};

export default ProductMeta;

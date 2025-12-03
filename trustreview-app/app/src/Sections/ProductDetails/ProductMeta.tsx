import { Stack, Rating, Typography } from "@mui/material";
import TagsList from "../../components/Tag/TagList";
import { type ITag, type IProduct } from "../../interfaces/Product";

const ProductMeta = ({ product, tags }: { product: IProduct; tags: ITag[] }) => {
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
          <Typography variant="body2">{product?.overallRating?.toFixed(1)}</Typography>
        </Stack>

        <Typography variant="body2" color="text.tertiary">
          ({product?.reviewsCount} reviews)
        </Typography>
      </Stack>

      <Typography variant="body1" fontWeight={600}>
        Tags
      </Typography>
      <TagsList tags={tags || []} />
    </Stack>
  );
};

export default ProductMeta;

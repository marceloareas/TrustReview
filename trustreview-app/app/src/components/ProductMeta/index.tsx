import { Stack, Rating, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import TagsList from "../Tag/TagList";
import { type IProduct } from "../../interfaces/Product";

interface ProductMetaProps {
  product: IProduct;
  reviewsLink?: boolean;
}

const ProductMeta = ({ product, reviewsLink = false }: ProductMetaProps) => {
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

        {reviewsLink && product.id ? (
          <Link
            component={RouterLink}
            to={`/products/${product.id}`}
            variant="body2"
            sx={{ fontWeight: 600 }}
          >
            Ver reviews
          </Link>
        ) : (
          <Typography variant="body2" color="text.tertiary">
            ({product?.reviewsCount} reviews)
          </Typography>
        )}
      </Stack>

      <Typography variant="body1" fontWeight={600}>
        Tags
      </Typography>
      <TagsList tags={product.tags || []} />
    </Stack>
  );
};

export default ProductMeta;

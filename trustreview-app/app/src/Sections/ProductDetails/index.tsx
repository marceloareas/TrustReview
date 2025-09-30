import {
  Box,
  Button,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import type { IProduct } from "../../interfaces/Product";
import ProductImage from "../../components/Product/ProductImage";
import TagsList from "../../components/TagList";

const ProductDetailsSection = ({ product, isReviewing, onReview }: { product: Partial<IProduct>, isReviewing: boolean, onReview: () => void }) => {
  return (
    <Container maxWidth="xl" sx={{ flex: 1 }}>
      <Stack
        flex={1}
        spacing={4}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          sx={{ width: "100%" }}
        >
          <Box>
            <ProductImage name={product?.name} imageUrl={product?.imageUrl} />
          </Box>
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={100}>
              {product?.name}
            </Typography>
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
            <Typography variant="h6" fontWeight={100}>
              Tags
            </Typography>
            <TagsList tags={product?.tags || []} />
          </Stack>
        </Stack>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Typography variant="body2" color="text.tertiary">
            {product?.createdAt?.toLocaleDateString()} -{" "}
            {product?.updatedAt?.toLocaleDateString()}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line" }}
          >
            {product?.description}
          </Typography>
        </Stack>
        {!isReviewing && <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
        >
          <Button variant="contained" size="large" onClick={onReview}>
            Fazer Review
          </Button>
        </Box>}
      </Stack>
    </Container>
  );
};

export default ProductDetailsSection;

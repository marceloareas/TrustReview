import { Box, Grid, Stack, Typography } from "@mui/material";
import type { IReview } from "../../interfaces/Product";
import ReviewCard from "../../components/ReviewCard";
import { useAuth } from "../../hooks/useAuth";

const ProductReviewSection = ({
  reviews,
  setReviews,
  setIsReviewOpen,
}: {
  reviews: IReview[];
  setReviews: (value: React.SetStateAction<IReview[]>) => void;
  setIsReviewOpen: (isOpen: boolean) => void;
}) => {
  const { user } = useAuth();

  return (
    <Stack spacing={4} justifyContent={"center"} width={"100%"}>
      <Typography variant="h4" fontWeight={100}>
        Avaliações
      </Typography>

      {reviews.length === 0 && (
        <Box sx={{ width: "100%", textAlign: "center", py: 8 }}>
          <Typography variant="body1">Nenhuma avaliação encontrada.</Typography>
        </Box>
      )}

      <Grid container spacing={4} pb={4}>
        {reviews.length > 0 &&
          reviews.map((review) => (
            <Grid
              key={review.productId + review.userId}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <ReviewCard
                review={review}
                setReviews={setReviews}
                setIsReviewing={setIsReviewOpen}
                isUserComment={user?.id === review.userId}
              />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};

export default ProductReviewSection;

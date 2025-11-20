import { Box, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { IReview } from "../../interfaces/Product";
import { reviewService } from "../../services";
import ReviewCard from "../../components/ReviewCard";

const ProductReviewSection = ({
  id,
  reviewed,
  setIsReviewing,
}: {
  id: string;
  reviewed: boolean;
  setIsReviewing: (isReviewing: boolean) => void;
}) => {
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    const fetchReview = async () => {
      if (!id) return;
      try {
        const res = await reviewService.getReviews(id);
        setReviews(res);
      } catch (error) {
        console.error("Error fetching product:", error);
        setReviews([]);
      }
    };

    fetchReview();
  }, [reviewed, id]);

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
            <Grid key={review.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ReviewCard
                review={review}
                setReviews={setReviews}
                setIsReviewing={setIsReviewing}
              />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};

export default ProductReviewSection;

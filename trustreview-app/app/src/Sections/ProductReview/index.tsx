import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import LikeOrNot from "../../components/LikeOrNot";
import { useCallback, useEffect, useState } from "react";
import type { IReview } from "../../interfaces/Product";
import { reviewService } from "../../services";

const ProductReviewSection = ({
  id,
  reviewed,
}: {
  id: string;
  reviewed: boolean;
}) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [likes, setLikes] = useState<{
    [key: string]: { isLike: boolean; isDislike: boolean };
  }>({});

  const handleClick = useCallback((reviewId: string, opt: string) => {
    setLikes((prev) => {
      const current = prev[reviewId] || { isLike: false, isDislike: false };
      if (opt === "like") {
        return {
          ...prev,
          [reviewId]: {
            isLike: !current.isLike,
            isDislike: false,
          },
        };
      }
      if (opt === "dislike") {
        return {
          ...prev,
          [reviewId]: {
            isLike: false,
            isDislike: !current.isDislike,
          },
        };
      }
      return prev;
    });
  }, []);

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
    <Stack spacing={4} justifyContent={'center'} width={'100%'}>
      <Typography variant="h4" fontWeight={100}>
        Avaliações
      </Typography>

      {reviews.length === 0 && (
        <Box sx={{ width: "100%", textAlign: "center", py: 8 }}>
          <Typography variant="body1">
            Nenhuma avaliação encontrada.
          </Typography>
        </Box>
      )}

      <Grid container spacing={4} pb={4}>
        {reviews.length > 0 &&
          reviews.map((review) => (
            <Grid key={review.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  p: 0.2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    pb={1}
                  >
                    <Typography variant="h6" fontWeight={700}>
                      {review.title}
                    </Typography>
                    <Stack
                      direction="row"
                      pt={0.5}
                      spacing={0.5}
                      alignItems="center"
                    >
                      <Rating
                        name="Product rating"
                        value={review.rating}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                    </Stack>
                  </Stack>
                  <Typography variant="h6" fontWeight={100}>
                    Decrição:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 1.5 }}
                  >
                    {review.description}
                  </Typography>
                  <Typography variant="h6" fontWeight={100}>
                    Pros
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 1.5 }}
                  >
                    {review.pros}
                  </Typography>
                  <Typography variant="h6" fontWeight={100}>
                    Contras
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 1.5 }}
                  >
                    {review.con}
                  </Typography>

                  <Typography variant="body2" color="text.tertiary">
                    {review?.createdAt &&
                      `${new Date(review.createdAt).toLocaleString("pt-BR")}`}
                    {review?.updatedAt &&
                      ` | ${new Date(review.updatedAt).toLocaleString("pt-BR")}`}
                  </Typography>
                </CardContent>
                <CardActions key={review.id}>
                  <LikeOrNot
                    onClick={(opt) => handleClick(review.id as string, opt)}
                    isLike={likes[review.id as string]?.isLike || false}
                    isDislike={likes[review.id as string]?.isDislike || false}
                    likesCount={review.likes}
                    dislikesCount={review.dislikes}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};

export default ProductReviewSection;

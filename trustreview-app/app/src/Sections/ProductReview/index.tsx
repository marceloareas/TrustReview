import {
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import type { IReview } from "../../interfaces/Product";
import LikeOrNot from "../../components/LikeOrNot";

const ProductReviewSection = ({ reviews }: { reviews: IReview[] }) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4} pb={4}>
        {reviews.map((review) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                borderRadius: 4,
                p: 0.5,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack
                  direction={"row"}
                  alignItems={"flex-start"}
                  justifyContent={"space-between"}
                  pb={1}
                >
                  <Typography variant="h6" fontWeight={100} flexGrow={1}>
                    {review?.title}
                  </Typography>
                  <Stack direction={"row"} pt={0.5}>
                    <Rating
                      name="Product rating"
                      value={review.rating}
                      precision={0.5}
                      readOnly
                    />
                  </Stack>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 1.5 }}
                >
                  {review.comment}
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
                  {review.cons}
                </Typography>

                <Typography fontSize={12} color="text.secondary" pt={1}>
                  {review?.userName} -{" "}
                  {review?.updatedAt ? "Atualizado" : "Criado"}:{" "}
                  {review?.updatedAt
                    ? review?.updatedAt?.toLocaleDateString()
                    : review?.createdAt?.toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <LikeOrNot onClick={() => {}} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductReviewSection;

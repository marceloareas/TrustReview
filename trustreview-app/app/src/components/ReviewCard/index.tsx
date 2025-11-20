import {
  Card,
  CardContent,
  Typography,
  Stack,
  Rating,
  Box,
  CardActions,
} from "@mui/material";
import LikeOrNot from "../LikeOrNot";
import type { IReview } from "../../interfaces/Product";
import { useState, useCallback } from "react";
import { reviewService } from "../../services";
import CreateIcon from "@mui/icons-material/Create";
import useNavigateIfAuthorized from "../../hooks/useNavigateIfAuthorized";

interface ReviewCardProps {
  review: IReview;
  setReviews: (value: React.SetStateAction<IReview[]>) => void;
  setIsReviewing: (isReviewing: boolean) => void;
}

const ReviewCard = ({
  review,
  setReviews,
  setIsReviewing,
}: ReviewCardProps) => {
  const [likes, setLikes] = useState<{
    [key: string]: { isLike: boolean; isDislike: boolean };
  }>({});
  const { navigateIfAuthorized } = useNavigateIfAuthorized();

  const handleClick = useCallback(
    async (review: IReview, opt: string) => {
      const reviewId = review.id as string;
      const current = likes[reviewId] || { isLike: false, isDislike: false };

      let newLikes = review.likes || 0;
      let newDislikes = review.dislikes || 0;

      if (opt === "like") {
        if (current.isLike) {
          newLikes = Math.max(0, newLikes - 1);
        } else {
          newLikes = newLikes + 1;
          if (current.isDislike) {
            newDislikes = Math.max(0, newDislikes - 1);
          }
        }
      } else if (opt === "dislike") {
        if (current.isDislike) {
          newDislikes = Math.max(0, newDislikes - 1);
        } else {
          newDislikes = newDislikes + 1;
          if (current.isLike) {
            newLikes = Math.max(0, newLikes - 1);
          }
        }
      }

      setLikes((prev) => {
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

      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? { ...r, likes: newLikes, dislikes: newDislikes }
            : r
        )
      );

      try {
        await reviewService.updateReview(review.userId, review.productId, {
          likes: newLikes,
          dislikes: newDislikes,
        });
      } catch (error) {
        console.error("Erro ao atualizar review:", error);
        setLikes((prev) => ({
          ...prev,
          [reviewId]: current,
        }));
        setReviews((prev) =>
          prev.map((r) =>
            r.id === reviewId
              ? { ...r, likes: review.likes, dislikes: review.dislikes }
              : r
          )
        );
      }
    },
    [likes]
  );

  return (
    <Card
      sx={{
        borderRadius: 4,
        p: 0.2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="body2" color="text.tertiary">
            Por: {review.userName || "Anônimo"}
          </Typography>
          <Stack direction="row" pt={0.5} spacing={0.5} alignItems="center">
            <Rating
              name="Product rating"
              value={review.rating}
              precision={0.5}
              readOnly
              size="small"
            />
          </Stack>
        </Stack>
        <Typography variant="h5" fontWeight={700}>
          {review.title}
        </Typography>
        <Typography variant="h6" fontWeight={100}>
          Decrição:
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
          {review.description}
        </Typography>
        <Typography variant="h6" fontWeight={100}>
          Pros
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
          <Box component={"ul"} ml={4}>
            {review.pros?.map((line, index) => (
              <Box component="li" key={index}>
                {line}
              </Box>
            ))}
          </Box>
        </Typography>
        <Typography variant="h6" fontWeight={100}>
          Contras
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
          <Box component={"ul"} ml={4}>
            {review.con?.map((line, index) => (
              <Box component="li" key={index}>
                {line}
              </Box>
            ))}
          </Box>
        </Typography>

        <Typography variant="body2" color="text.tertiary">
          {review?.createdAt &&
            `${new Date(review.createdAt).toLocaleString("pt-BR")}`}
          {review?.updatedAt &&
            ` | ${new Date(review.updatedAt).toLocaleString("pt-BR")}`}
        </Typography>
      </CardContent>
      <CardActions key={review.id}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <LikeOrNot
            onClick={(opt) => handleClick(review, opt)}
            isLike={likes[review.id as string]?.isLike || false}
            isDislike={likes[review.id as string]?.isDislike || false}
            likesCount={review.likes}
            dislikesCount={review.dislikes}
          />
          <Box>
            <CreateIcon
              sx={{ cursor: "pointer", ":hover": { transform: "scale(1.1)" } }}
              onClick={() => {
                navigateIfAuthorized();
                setIsReviewing(true);
              }}
            />
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ReviewCard;

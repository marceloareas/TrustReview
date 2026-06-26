import {
  Card,
  CardContent,
  Typography,
  Stack,
  Rating,
  Box,
  CardActions,
  Tooltip,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
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
  isUserComment?: boolean;
}

const ReviewCard = ({
  review,
  setReviews,
  setIsReviewing,
  isUserComment,
}: ReviewCardProps) => {
  const [localReactions, setLocalReactions] = useState<{
    isLike: boolean;
    isDislike: boolean;
  }>({ isLike: false, isDislike: false });
  const { navigateIfAuthorized } = useNavigateIfAuthorized();

  const handleClick = useCallback(
    async (review: IReview, opt: string) => {
      const current = localReactions;
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

      // atualiza estado local do card
      if (opt === "like") {
        setLocalReactions({ isLike: !current.isLike, isDislike: false });
      } else {
        setLocalReactions({ isLike: false, isDislike: !current.isDislike });
      }

      try {
        // usa o id real do review para atualizar no backend
        await reviewService.updateReview(review.userId, review.productId, {
          likes: newLikes,
          dislikes: newDislikes,
        });
      } catch (error) {
        console.error("Erro ao atualizar review:", error);
        // rollback do estado local e da listagem
        setLocalReactions(current);
        setReviews((prev) =>
          prev.map((r) =>
            r.userId === review.userId && r.productId === review.productId
              ? { ...r, likes: review.likes, dislikes: review.dislikes }
              : r
          )
        );
      }
    },
    [localReactions, setReviews]
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
            {review.analyzed && review.contradictory && (
              <Tooltip
                title="Nosso sistema acredita que a nota pode não condizer com a descrição"
                arrow
              >
                <WarningAmberIcon
                  fontSize="small"
                  sx={{ color: "warning.main", cursor: "pointer" }}
                />
              </Tooltip>
            )}
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
      <CardActions key={review.productId + review.userId}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <LikeOrNot
            userId={review.userId as string}
            onClick={(opt) => {
              handleClick(review, opt);
            }}
            isLike={localReactions.isLike}
            isDislike={localReactions.isDislike}
            likesCount={review.likes}
            dislikesCount={review.dislikes}
          />
          <Box display={isUserComment ? "block" : "none"}>
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

import {
  Box,
  Button,
  Container,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Review from "../../assets/icons/Review.svg";
import { useState } from "react";
import { reviewService } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useNotification } from "../../components/Snackbar/snackbar";
import useNavigateIfAuthorized from "../../hooks/useNavigateIfAuthorized";

const CreateReviewSection = ({
  onReview,
  setReviewed,
  productId,
}: {
  onReview: () => void;
  setReviewed?: (value: boolean) => void;
  productId?: string;
}) => {
  const { user } = useAuth();
  const { id: routeId } = useParams<{ id: string }>();
  const id = productId || routeId;
  const [rating, setRating] = useState<number | null>(0);
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [pros, setPros] = useState<string>("");
  const [cons, setCons] = useState<string>("");
  const { showNotification } = useNotification();
  const { navigateIfAuthorized } = useNavigateIfAuthorized();

  const handleSave = async () => {
    navigateIfAuthorized();
    if (!id) {
      console.error("Cannot post review: productId missing");
      showNotification("Erro ao realizar o Review. Tente novamente.", "error");
      return;
    }

    if (!title.trim() || !comment.trim()) {
      console.error("Title and comment are required");
      showNotification(
        "É necessário preencher o Título e Comentário.",
        "error"
      );
      return;
    }

    const payload = {
      userId: user?.id || "",
      productId: id || "",
      title,
      description: comment,
      likes: 0,
      dislikes: 0,
      pros: pros
        ? pros
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      con: cons
        ? cons
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      rating: rating || 0,
    };
    try {
      await reviewService.postReview(payload);
      if (setReviewed) setReviewed(true);
      showNotification("Review publicado com sucesso!", "success");
    } catch (error) {
      showNotification(`Erro ao realizar o Review. ${error}`, "error");
    } finally {
      onReview();
    }
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Stack
        flex={1}
        spacing={3}
        justifyContent={"center"}
        alignItems={"flex-start"}
        pb={4}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Typography>Review</Typography>
          <Box component={"img"} src={Review} alt="Review" />
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Rating
            name="Product rating"
            precision={0.5}
            value={rating}
            size="large"
            onChange={(_, newValue) => setRating(newValue)}
          />
          <Typography variant="body2">{rating || ""}</Typography>
        </Stack>

        <Stack spacing={1} sx={{ width: "100%" }}>
          <Typography>Título</Typography>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite um título para sua review"
          />
        </Stack>

        <Stack spacing={1} sx={{ width: "100%" }}>
          <Typography>Comment</Typography>
          <TextField
            multiline
            minRows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Stack>
        <Stack spacing={1} sx={{ width: "100%" }}>
          <Typography>Pros (utilize ENTER para separar os pros)</Typography>
          <TextField
            multiline
            minRows={5}
            value={pros}
            onChange={(e) => setPros(e.target.value)}
          />
        </Stack>
        <Stack spacing={1} sx={{ width: "100%" }}>
          <Typography>Cons (utilize ENTER para separar os contras)</Typography>
          <TextField
            multiline
            minRows={5}
            value={cons}
            onChange={(e) => setCons(e.target.value)}
          />
        </Stack>
        <Stack
          direction={"row"}
          spacing={4}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
          sx={{ width: "100%" }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "background.discard",
              "&:hover": {
                backgroundColor: "#e74545d2",
              },
            }}
            onClick={onReview}
          >
            Descartar Review
          </Button>

          <Button
            variant="contained"
            size="large"
            onClick={handleSave}
            disabled={!id}
          >
            Publicar Review
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default CreateReviewSection;

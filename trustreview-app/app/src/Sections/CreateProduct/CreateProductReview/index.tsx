import {
  Box,
  Button,
  Container,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Review from "../../../assets/icons/Review.svg";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

type ReviewFormData = {
  userId: string;
  title: string;
  description: string;
  pros: string[];
  con: string[];
  rating: number;
};

const CreateProductReview = ({
  onReview,
  onCancel,
  submitForm,
}: {
  onReview: (data: ReviewFormData) => void;
  onCancel?: () => void;
  submitForm?: () => void;
}) => {
  const { user } = useAuth();
  const [rating, setRating] = useState<number | null>(0);
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [pros, setPros] = useState<string>("");
  const [cons, setCons] = useState<string>("");

  const handlePublish = () => {
    const prosArr = pros
      ? pros
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const conArr = cons
      ? cons
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    if (!title.trim() || !comment.trim() || rating === null) return;

    onReview({
      userId: user?.id || "",
      title: title.trim(),
      description: comment.trim(),
      pros: prosArr,
      con: conArr,
      rating: rating || 0,
    });
    if (typeof submitForm === "function") {
      submitForm();
    }
  };

  return (
    <Container maxWidth="xl">
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
            minRows={3}
            value={pros}
            onChange={(e) => setPros(e.target.value)}
          />
        </Stack>

        <Stack spacing={1} sx={{ width: "100%" }}>
          <Typography>Cons (utilize ENTER para separar os contras)</Typography>
          <TextField
            multiline
            minRows={3}
            value={cons}
            onChange={(e) => setCons(e.target.value)}
          />
        </Stack>
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
            "&:hover": { backgroundColor: "#e74545d2" },
          }}
          onClick={() => onCancel && onCancel()}
        >
          Descartar Produto
        </Button>

        <Button
          variant="contained"
          size="large"
          type="button"
          onClick={handlePublish}
        >
          Publicar Produto
        </Button>
      </Stack>
    </Container>
  );
};

export default CreateProductReview;

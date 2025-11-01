import { Stack } from "@mui/material";
import CreateProduct from "../Sections/CreateProduct";
import { useState } from "react";
import CreateProductReview from "../Sections/CreateProduct/CreateProductReview";
import { useAuth } from "../hooks/useAuth";
import { reviewService } from "../services";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../components/Snackbar/snackbar";

const CreateProductPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [productId, setProductId] = useState<string | undefined>();
  const { showNotification } = useNotification();
  const [pendingReview, setPendingReview] = useState<{
    title: string;
    description: string;
    pros: string[];
    con: string[];
    rating: number;
  } | null>(null);

  const handleCancelPublish = () => {
    setProductId(undefined);
    navigate("/");
  };

  const handleReviewPublish = async (data: {
    title: string;
    description: string;
    pros: string[];
    con: string[];
    rating: number;
  }) => {
    if (!productId) {
      setPendingReview(data);
      return;
    }

    const payload = {
      userId: user?.id || "",
      productId: productId,
      title: data.title,
      description: data.description,
      likes: 0,
      dislikes: 0,
      pros: data.pros,
      con: data.con,
      rating: data.rating,
    };

    try {
      await reviewService.postReview(payload);
      console.log("Review publicada");
      showNotification("Review publicado com sucesso!", "success");
    } catch (error) {
      showNotification(
        "Houve um erro ao criar o Review. Tente Novamente.",
        "error",
      );
      console.error("Error saving review:", error);
    }
  };

  const handleProductCreated = async (id: string) => {
    setProductId(id);
    if (pendingReview) {
      try {
        await reviewService.postReview({
          userId: user?.id || "",
          productId: id,
          title: pendingReview.title,
          description: pendingReview.description,
          likes: 0,
          dislikes: 0,
          pros: pendingReview.pros,
          con: pendingReview.con,
          rating: pendingReview.rating,
        });
        setPendingReview(null);
        navigate("/");
      } catch (error) {
        console.error("Error publishing pending review:", error);
      }
    }
  };

  return (
    <Stack
      spacing={4}
      sx={{
        width: "100%",
        bgcolor: "background.default",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CreateProduct onCreated={handleProductCreated} />
      <CreateProductReview
        onReview={handleReviewPublish}
        onCancel={handleCancelPublish}
      />
    </Stack>
  );
};

export default CreateProductPage;

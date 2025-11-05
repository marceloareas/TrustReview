import { Stack } from "@mui/material";
import CreateProduct from "../Sections/CreateProduct";
import { useState, useRef } from "react";
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
  // keep a ref so we can synchronously read pending review when the child triggers form submit
  const pendingReviewRef = useRef<typeof pendingReview>(null);
  const [submitForm, setSubmitForm] = useState<(() => void) | null>(null);

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

      pendingReviewRef.current = data;
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
    const toPublish = pendingReviewRef.current || pendingReview;
    if (toPublish) {
      try {
        await reviewService.postReview({
          userId: user?.id || "",
          productId: id,
          title: toPublish.title,
          description: toPublish.description,
          likes: 0,
          dislikes: 0,
          pros: toPublish.pros,
          con: toPublish.con,
          rating: toPublish.rating,
        });
        // clear both ref and state
        pendingReviewRef.current = null;
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
      <CreateProduct
        onCreated={handleProductCreated}
        registerSubmit={(fn: () => void) => {
          // pass the submit function to the review component via prop
          // we'll render CreateProductReview below with submitForm
          setSubmitForm(() => fn);
        }}
      />
      <CreateProductReview
        onReview={handleReviewPublish}
        onCancel={handleCancelPublish}
        submitForm={submitForm ?? undefined}
      />
    </Stack>
  );
};

export default CreateProductPage;

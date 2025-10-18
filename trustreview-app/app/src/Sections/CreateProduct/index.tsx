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
import ProductInputImage from "../../components/Product/ProductInputImage";
import TagsList from "../../components/TagList";
import { productService } from "../../services";
import { useForm, Controller } from "react-hook-form";
import type { IProduct } from "../../interfaces/Product";

interface CreateProductReviewForm {
  name: string;
  description: string;
  image?: File | null;
  reviewRating: number;
  comment: string;
  pros: string;
  cons: string;
}

const CreateProduct = ({ product = {} }: { product?: Partial<IProduct> }) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateProductReviewForm>({
    defaultValues: {
      name: "",
      description: "",
      reviewRating: 0,
      comment: "",
      pros: "",
      cons: "",
    },
  });

  const onSubmit = async (data: CreateProductReviewForm) => {
    try {
      const newProduct = {
        name: data.name,
        description: data.description,
      };

      const response = await productService.createProduct(newProduct);
      console.log("Produto criado:", response);

      const newReview = {
        reviewRating: data.reviewRating,
        comment: data.comment,
        pros: data.pros,
        cons: data.cons,
        productId: response.id,
      };

      console.log("Review", newReview);

      //const createdReview = await productService.createReview(newReview);
      //console.log("✅ Review criada:", createdReview);

      reset();
      setPreviewUrl(undefined);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };
  /*
    // Enviar Review
  const onSubmitReview = async (data: CreateReviewForm) => {
    if (!productId) return; // segurança
    try {
      const newReview = { ...data, productId };
      const response = await reviewService.createReview(newReview);
      console.log("Review criada:", response);
      resetReview();
    } catch (error) {
      console.error("Erro ao criar review:", error);
    }
  };*/

  return (
    <Container maxWidth="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          flex={1}
          spacing={3}
          justifyContent={"center"}
          alignItems={"flex-start"}
          pb={4}
        >
          {/* Nome e imagem */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            sx={{ width: "100%" }}
          >
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <ProductInputImage
                  imageUrl={previewUrl}
                  onChange={(file) => {
                    field.onChange(file);
                    setPreviewUrl(file ? URL.createObjectURL(file) : undefined);
                  }}
                />
              )}
            />

            <Stack spacing={2}>
              <Typography>Product Name</Typography>
              <Controller
                name="name"
                control={control}
                rules={{ required: "O nome é obrigatório" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Typography variant="h6" fontWeight={100}>
                Tags
              </Typography>
              <TagsList tags={product?.tags || []} />
            </Stack>
          </Stack>

          {/* Descrição */}
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Typography>Description</Typography>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField multiline minRows={5} {...field} />
              )}
            />
          </Stack>

          {/* Review e rating */}
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography>Review</Typography>
            <Box component={"img"} src={Review} alt="Review" />
          </Stack>

          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Controller
              name="reviewRating"
              control={control}
              render={({ field }) => (
                <Rating
                  name="Product rating"
                  precision={0.5}
                  value={field.value}
                  size="large"
                  onChange={(_, newValue) => field.onChange(newValue)}
                />
              )}
            />
            <Typography variant="body2">
              <Controller
                name="reviewRating"
                control={control}
                render={({ field }) => <>{field.value || ""}</>}
              />
            </Typography>
          </Stack>

          {/* Comment */}
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Typography>Comment</Typography>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <TextField multiline minRows={5} {...field} />
              )}
            />
          </Stack>

          {/* Pros */}
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Typography>Pros</Typography>
            <Controller
              name="pros"
              control={control}
              render={({ field }) => (
                <TextField multiline minRows={5} {...field} />
              )}
            />
          </Stack>

          {/* Cons */}
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Typography>Cons</Typography>
            <Controller
              name="cons"
              control={control}
              render={({ field }) => (
                <TextField multiline minRows={5} {...field} />
              )}
            />
          </Stack>

          {/* Botões */}
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
              onClick={() => {
                reset();
                setPreviewUrl(undefined);
              }}
            >
              Descartar Produto e Review
            </Button>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
            >
              Publicar Produto e Review
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default CreateProduct;

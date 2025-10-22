import { Container, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductInputImage from "../../components/Product/ProductInputImage";
import { productService, tagService } from "../../services";
import { useForm, Controller } from "react-hook-form";
import type { ITag } from "../../interfaces/Product";
import TagsList from "../../components/TagList";

interface CreateProductReviewForm {
  name: string;
  description: string;
  image?: File | null;
  reviewRating: number;
  comment: string;
  pros: string;
  cons: string;
}

const CreateProduct = () => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await tagService.getTags();
        setTags(tags);
      } catch (error) {
        console.error("Erro ao buscar tags:", error);
      }
    };

    fetchTags();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: {},
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

      reset();
      setPreviewUrl(undefined);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  return (
    <Container maxWidth="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          flex={1}
          justifyContent={"center"}
          alignItems={"flex-start"}
          spacing={4}
        >
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
              <Controller
                name="name"
                control={control}
                rules={{ required: "O nome é obrigatório" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    placeholder="Nome"
                    variant="standard"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Typography variant="body1" fontWeight={600}>
                Tags
              </Typography>
              <TagsList tags={tags || []} isEdit={true} />
            </Stack>
          </Stack>

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
        </Stack>
      </form>
    </Container>
  );
};

export default CreateProduct;

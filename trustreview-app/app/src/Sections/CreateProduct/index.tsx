import { Container, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState, useCallback, useRef } from "react";
import ProductInputImage from "../../components/Product/ProductInputImage";
import { tagService } from "../../services";
import { useForm, Controller } from "react-hook-form";
import type { ITag } from "../../interfaces/Product";
import TagsList from "../../components/Tag/TagList";
import useProduct from "../../hooks/useProduct";
import { getSearchedProductName } from "../../utils/getSearchedProductName";

interface CreateProductReviewForm {
  name: string;
  description: string;
  image?: File | null;
  tags: ITag[];
}

const CreateProduct = ({
  onCreated,
  registerSubmit,
}: {
  onCreated?: (productId: string) => void;
  registerSubmit?: (fn: () => void) => void;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [tags, setTags] = useState<ITag[]>([]);
  const [currentTagsList, setCurrentTagsList] = useState<ITag[]>([]);
  const { createProduct } = useProduct();

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

  const { control, handleSubmit, reset } = useForm<CreateProductReviewForm>({
    defaultValues: {
      name: getSearchedProductName(),
      description: "",
      tags: [],
      image: null,
    },
  });

  const onSubmit = useCallback(
    async (data: CreateProductReviewForm) => {
      try {
        const newProduct = {
          name: data.name,
          description: data.description,
          tags: currentTagsList,
          image: data.image ?? null,
        };

        const response = await createProduct(newProduct);
        reset();
        if (onCreated && response?.id) {
          onCreated(response.id);
        }
        localStorage.removeItem('searchTerm');
      } catch (error) {
        console.error("Erro ao criar produto:", error);
      }
    },
    [createProduct, reset, onCreated, currentTagsList]
  );

  const latestSubmitRef = useRef<() => void>(() => { });

  latestSubmitRef.current = useCallback(() => {
    void handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  const stableRegisterWrapper = useCallback(() => {
    latestSubmitRef.current?.();
  }, []);

  useEffect(() => {
    if (registerSubmit) registerSubmit(stableRegisterWrapper);
  }, [registerSubmit]);

  return (
    <Container maxWidth="xl">
      <form id="create-product-form" onSubmit={handleSubmit(onSubmit)}>
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
              <TagsList
                tags={tags || []}
                isEdit={true}
                currentTagsList={currentTagsList}
                setCurrentTagsList={setCurrentTagsList}
                onCreateTag={async (tag) => {
                  try {
                    const created = await tagService.createTag(tag.name);
                    setCurrentTagsList((prev) => [...prev, created]);
                    setTags((prev) => [...prev, created]); // atualiza lista disponível também
                  } catch (error) {
                    console.error("Erro ao criar tag:", error);
                  }
                }}
              />
            </Stack>
          </Stack>

          <Stack spacing={1} sx={{ width: "100%" }}>
            <Typography>Descrição</Typography>
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

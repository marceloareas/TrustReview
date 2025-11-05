import {
  Box,
  Button,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import type { IProduct, ITag } from "../../interfaces/Product";
import ProductImage from "../../components/Product/ProductImage";
import { useEffect, useState } from "react";
import { tagService } from "../../services";
import { useNavigate } from "react-router-dom";
import ProductCardStackList from "../../components/Product/ProductCardStackList";
import CreateReviewSection from "../CreateReview";
import ProductReviewSection from "../ProductReview";
import TagsList from "../../components/Tag/TagList";
import useProduct from "../../hooks/useProduct";

const ProductDetailsSection = ({
  id,
}: {
  id: string;
}) => {
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [productTags, setProductTags] = useState<ITag[]>([]);
  const [reviewed, setReviewed] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(null);
  const { getProductById, getRelatedProducts, loading } = useProduct();

  const fetchProduct = async () => {
    const fetchedProduct = await getProductById(id ?? "");
    setProduct(fetchedProduct);
  };

  const fetchRelatedProducts = async () => {
    if (!product?.id) return;
    const res = await getRelatedProducts(product.id || "");
    setRelatedProducts(res);
  };

  useEffect(() => {
    fetchProduct();
  }, [id, reviewed]);

  useEffect(() => {
    fetchRelatedProducts();
  }, [product?.id]);

  useEffect(() => {
    const fetchProductTags = async () => {
      if (!product?.id) return;
      try {
        const res = await tagService.getTagsByProductId(product.id || "");
        setProductTags(res);
      } catch (error) {
        console.error("Error fetching product tags:", error);
      }
    };
    fetchProductTags();
  }, [product?.id]);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <h2>Carregando...</h2>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <h2>Produto não encontrado</h2>
      </Box>
    );
  }

  const handleClickProduct = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <Container maxWidth="xl" sx={{ flex: 1 }}>
      <Stack
        flex={1}
        spacing={4}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          sx={{ width: "100%" }}
        >
          <Box>
            <ProductImage name={product?.name} imageUrl={product?.imageUrl} />
          </Box>
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={100}>
              {product?.name}
            </Typography>
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems={"flex-start"}
              spacing={1}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Rating
                  name="Product rating"
                  value={product.overallRating}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body2">
                  {product?.overallRating?.toFixed(1)}
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.tertiary">
                ({product?.reviewsCount} reviews)
              </Typography>
            </Stack>
            <Typography variant="body1" fontWeight={600}>
              Tags
            </Typography>
            <TagsList tags={productTags || []} />
          </Stack>
        </Stack>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Typography variant="body2" color="text.tertiary">
            {product?.createdAt &&
              `Criado em: ${new Date(product.createdAt).toLocaleString("pt-BR")}`}
            {product?.updatedAt &&
              ` | Atualizado em: ${new Date(product.updatedAt).toLocaleString("pt-BR")}`}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line" }}
          >
            {product?.description}
          </Typography>
        </Stack>
        {!isReviewing && (
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"flex-end"}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => setIsReviewing(true)}
            >
              Fazer Review
            </Button>
          </Box>
        )}
        {!isReviewing && (
          <ProductReviewSection id={id ? id : ""} reviewed={reviewed} />
        )}
        {isReviewing && (
          <CreateReviewSection
            onReview={() => setIsReviewing(false)}
            setReviewed={setReviewed}
          />
        )}
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Typography variant="h4" fontWeight={100}>
            Produtos Relacionados
          </Typography>
          <ProductCardStackList
            productList={relatedProducts}
            onClick={handleClickProduct}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default ProductDetailsSection;

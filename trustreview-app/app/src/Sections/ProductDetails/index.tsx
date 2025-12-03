import { Box, Container, Stack, Typography } from "@mui/material";
import { type IProduct, type ITag } from "../../interfaces/Product";
import ProductImage from "../../components/Product/ProductImage";
import { useEffect, useState } from "react";
import { tagService } from "../../services";
import { useNavigate } from "react-router-dom";
import ProductHeader from "./ProductHeader";
import ProductMeta from "./ProductMeta";
import ReviewSection from "./ReviewSection";
import RelatedProducts from "./RelatedProducts";
import useProduct from "../../hooks/useProduct";

const ProductDetailsSection = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [productTags, setProductTags] = useState<ITag[]>([]);
  const [reviewsRefreshKey, setReviewsRefreshKey] = useState(0);
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
  }, [id, reviewsRefreshKey]);

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

  const handleClickProduct = (id: string) => navigate(`/products/${id}`);

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
            <ProductHeader product={product} />
            <ProductMeta product={product} tags={productTags || []} />
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
        <ReviewSection
          id={id ? id : ""}
          refreshKey={reviewsRefreshKey}
          onReviewed={() => setReviewsRefreshKey((k) => k + 1)}
        />
  <RelatedProducts products={relatedProducts} onClick={handleClickProduct} />
      </Stack>
    </Container>
  );
};

export default ProductDetailsSection;

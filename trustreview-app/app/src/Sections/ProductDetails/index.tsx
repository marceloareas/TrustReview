import { Box, Container, Stack } from "@mui/material";
import { type IProduct } from "../../interfaces/Product";
import ProductImage from "../../components/Product/ProductImage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductHeader from "../../components/ProductHeader";
import ProductMeta from "../../components/ProductMeta";
import ProductDescription from "../../components/Product/ProductDescription";
import ReviewSection from "./components/ReviewSection";
import useProduct from "../../hooks/useProduct";
import RelatedProducts from "./components/RelatedProducts";

const ProductDetailsSection = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [reviewsRefreshKey, setReviewsRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const { getProductById, getRelatedProducts } = useProduct();

  const fetchProduct = async () => {
    setLoading(true);
    const fetchedProduct = await getProductById(id ?? "");
    setProduct(fetchedProduct);
    setLoading(false);
  };

  const fetchRelatedProducts = async () => {
    if (!product?.id) return;
    const res = await getRelatedProducts(product.id || "");
    setRelatedProducts(res);
  };

  useEffect(() => {
    fetchProduct();
  }, [id, reviewsRefreshKey, getProductById]);

  useEffect(() => {
    fetchRelatedProducts();
  }, [product?.id, getRelatedProducts]);

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
            <ProductMeta product={product} />
          </Stack>
        </Stack>
        <ProductDescription product={product} />
        <ReviewSection
          id={id ? id : ""}
          refreshKey={reviewsRefreshKey}
          onReviewed={() => setReviewsRefreshKey((k) => k + 1)}
        />
        <RelatedProducts
          products={relatedProducts}
          onClick={handleClickProduct}
        />
      </Stack>
    </Container>
  );
};

export default ProductDetailsSection;

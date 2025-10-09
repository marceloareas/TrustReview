import ProductDetailsSection from "../Sections/ProductDetails";
import CreateReviewSection from "../Sections/CreateReview";
import ProductReviewSection from "../Sections/ProductReview";
import { Box, Container, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productService } from "../services";
import type { IProduct } from "../interfaces/Product";
import ProductCardStackList from "../components/Product/ProductCardStackList";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const res = await productService.getProductById(id);
        setProduct(res);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchRelatedProducts = async () => {
      if (!id) return;
      try {
        const relatedRes = await productService.getRelatedProducts(id);
        setProducts(relatedRes);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

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

  return (
    <Stack
      spacing={4}
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.default",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <ProductDetailsSection
        product={product}
        isReviewing={isReviewing}
        onReview={() => setIsReviewing(true)}
      />
      {!isReviewing && <ProductReviewSection reviews={product.reviews || []} />}
      {isReviewing && (
        <CreateReviewSection onReview={() => setIsReviewing(false)} />
      )}
      <Container maxWidth="xl">
        <ProductCardStackList productList={products} />
      </Container>
    </Stack>
  );
};

export default ProductPage;

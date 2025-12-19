import { Box, Stack, Typography } from "@mui/material";
import useProduct from "../../../hooks/useProduct";
import { useEffect, useState } from "react";
import type { IProduct, IReview } from "../../../interfaces/Product";

const ProsCons = ({ product }: { product: IProduct }) => {
  const { getProductReviewsById } = useProduct();
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!product.id) return;
      const reviews = await getProductReviewsById(product.id);
      setReviews(reviews);
    };

    fetchReviews();
  }, [product.id, getProductReviewsById]);

  // Compilar pros e cons dos primeiros 3 reviews
  const compiledPros = reviews
    .slice(0, 3)
    .flatMap((review) => review.pros || [])
    .filter((pro, index, self) => self.indexOf(pro) === index); // Remove duplicatas

  const compiledCons = reviews
    .slice(0, 3)
    .flatMap((review) => review.con || [])
    .filter((con, index, self) => self.indexOf(con) === index); // Remove duplicatas

  return (
    <Stack spacing={4} justifyContent={"center"} width={"100%"}>
      {reviews.length === 0 && (
        <Box sx={{ width: "100%", textAlign: "center", py: 8 }}>
          <Typography variant="body1">Nenhuma avaliação encontrada.</Typography>
        </Box>
      )}

      {reviews.length > 0 && (
        <Stack>
          <Typography variant="h6" fontWeight={100}>
            Pros
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
            <Box component={"ul"} ml={4}>
              {compiledPros.length > 0 ? (
                compiledPros.map((line, index) => (
                  <Box component="li" key={index}>
                    {line}
                  </Box>
                ))
              ) : (
                <Box component="li">Nenhum ponto positivo registrado</Box>
              )}
            </Box>
          </Typography>
          <Typography variant="h6" fontWeight={100}>
            Contras
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
            <Box component={"ul"} ml={4}>
              {compiledCons.length > 0 ? (
                compiledCons.map((line, index) => (
                  <Box component="li" key={index}>
                    {line}
                  </Box>
                ))
              ) : (
                <Box component="li">Nenhum ponto negativo registrado</Box>
              )}
            </Box>
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default ProsCons;

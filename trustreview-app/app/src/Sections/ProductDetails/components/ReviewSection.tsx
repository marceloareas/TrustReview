import { Box, Button } from "@mui/material";
import ProductReviewSection from "../../ProductReview";
import useNavigateIfAuthorized from "../../../hooks/useNavigateIfAuthorized";
import { useEffect, useState } from "react";
import type { IReview } from "../../../interfaces/Product";
import { useAuth } from "../../../hooks/useAuth";
import CreateReviewSection from "./CreateReviewSection";
import useProduct from "../../../hooks/useProduct";

const ReviewSection = ({
  id: productId,
  refreshKey,
  onReviewed,
}: {
  id: string;
  refreshKey: number;
  onReviewed?: () => void;
}) => {
  const { user } = useAuth();
  const { getProductReviewsById } = useProduct();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { navigateIfAuthorized } = useNavigateIfAuthorized();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const userAlreadyReviewed = reviews.some(
    (review) => review.userId === user?.id
  );

  useEffect(() => {
    const fetchReview = async () => {
      const reviews = await getProductReviewsById(productId);
      setReviews(reviews || []);
    };

    fetchReview();
  }, [refreshKey, productId, getProductReviewsById]);

  return (
    <>
      {!isReviewOpen && (
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
            onClick={() => {
              navigateIfAuthorized();
              setIsReviewOpen(true);
            }}
            disabled={userAlreadyReviewed}
          >
            Fazer Review
          </Button>
        </Box>
      )}

      {!isReviewOpen && (
        <ProductReviewSection
          reviews={reviews}
          setReviews={setReviews}
          setIsReviewOpen={setIsReviewOpen}
        />
      )}

      {isReviewOpen && (
        <CreateReviewSection
          productId={productId}
          onReview={() => {
            setIsReviewOpen(false);
            if (onReviewed) onReviewed();
          }}
        />
      )}
    </>
  );
};

export default ReviewSection;

import { Box, Button } from "@mui/material";
import CreateReviewSection from "../CreateReview";
import ProductReviewSection from "../ProductReview";
import useNavigateIfAuthorized from "../../hooks/useNavigateIfAuthorized";
import { useState } from "react";

const ReviewSection = ({ id, refreshKey, onReviewed }: { id: string; refreshKey: number; onReviewed?: () => void }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { navigateIfAuthorized } = useNavigateIfAuthorized();

  return (
    <>
      {!isReviewOpen && (
        <Box width={"100%"} height={"100%"} display={"flex"} justifyContent={"flex-end"} alignItems={"flex-end"}>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              navigateIfAuthorized();
              setIsReviewOpen(true);
            }}
          >
            Fazer Review
          </Button>
        </Box>
      )}

      {!isReviewOpen && (
        <ProductReviewSection id={id} refreshKey={refreshKey} setIsReviewOpen={setIsReviewOpen} />
      )}

      {isReviewOpen && (
        <CreateReviewSection
          productId={id}
          onReview={() => {
            navigateIfAuthorized();
            setIsReviewOpen(false);
            if (onReviewed) onReviewed();
          }}
        />
      )}
    </>
  );
};

export default ReviewSection;

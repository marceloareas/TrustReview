import { Stack } from "@mui/material";
import CreateProduct from "../Sections/CreateProduct";
import CreateReviewSection from "../Sections/CreateReview";

const CreateProductPage = () => {
  return (
    <Stack
      spacing={4}
      sx={{
        width: "100%",
        bgcolor: "background.default",
        justifyContent: "center",
        alignItems: "flex-start",
        
      }}
    >
      <CreateProduct />
      <CreateReviewSection onReview={() => { }} />
    </Stack>
  );
};

export default CreateProductPage;

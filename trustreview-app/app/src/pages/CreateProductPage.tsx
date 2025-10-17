import { Stack } from "@mui/material";
import CreateProduct from "../Sections/CreateProduct";

const CreateProductPage = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.default",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CreateProduct />
    </Stack>
  );
};

export default CreateProductPage;

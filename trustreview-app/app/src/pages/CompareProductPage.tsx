import { Stack } from "@mui/material";
import CompareProductsMock from "../Sections/CompareProduct";

const CompareProductPage = () => {
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
      <CompareProductsMock />
    </Stack>
  );
};

export default CompareProductPage;

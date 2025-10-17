import { Stack } from "@mui/material";
import RegisterSection from "../Sections/Register";

const RegisterPage = () => {
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
      <RegisterSection />
    </Stack>
  );
};

export default RegisterPage;

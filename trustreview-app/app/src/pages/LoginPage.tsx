import { Stack } from "@mui/material";
import LoginSection from "../Sections/Login";

const LoginPage = () => {
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
      <LoginSection />
    </Stack>
  );
};

export default LoginPage;

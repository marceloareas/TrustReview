import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar/index.tsx";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <AppBar />
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          width: "100%",
          backgroundColor: "background.default",
          py: 4,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout;

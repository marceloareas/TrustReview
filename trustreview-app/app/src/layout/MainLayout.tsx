import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar/index.tsx";
import { Box } from "@mui/material";


const MainLayout = () => {
    return (
        <>
            <AppBar />
            <Box sx={{ height: "calc(100vh - 64px)", width: "100%" }}>
                <Outlet />
            </Box>
        </>
    );
};

export default MainLayout;

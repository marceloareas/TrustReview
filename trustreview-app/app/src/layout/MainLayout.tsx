import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar/index.tsx";


const MainLayout = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};

export default MainLayout;

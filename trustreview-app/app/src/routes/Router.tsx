import { RouterProvider } from "react-router-dom";
import router from "./routes";

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;

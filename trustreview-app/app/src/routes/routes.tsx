import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
    children: [],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import SearchedProductsPage from "../pages/SearchedProductsPage";
import MainLayout from "../layout/MainLayout";
import ProductPage from "../pages/ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: "/products",
        element: <SearchedProductsPage />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
      },
    ],
  },
]);

export default router;

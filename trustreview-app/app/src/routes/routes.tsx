/**
 * routes
 *
 * Propósito:
 *  Definir as rotas da aplicação usando `createBrowserRouter` do React Router.
 *
 * Uso:
 *  - Importar o `router` exportado e fornecê-lo ao `RouterProvider` na raiz
 *    da aplicação.
 *
 * Entradas:
 *  - Importa as páginas e o layout que serão montados nas rotas.
 *
 * Comportamento:
 *  - Rota raiz (`/`) usa `MainLayout` como wrapper e define rotas filhas:
 *    - index: `SearchPage`
 *    - `/products`: `SearchedProductsPage`
 *    - `/products/:id`: `ProductPage`
 *    - `/login`: `LoginPage`
 *    - `/register`: `RegisterPage`
 *    - `/createProduct`: `CreateProductPage`
 *  - Exporta `router` para uso com `RouterProvider`.
 */

import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import SearchedProductsPage from "../pages/SearchedProductsPage";
import MainLayout from "../layout/MainLayout";
import ProductPage from "../pages/ProductPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CreateProductPage from "../pages/CreateProductPage";

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
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/createProduct",
        element: <CreateProductPage />,
      },
    ],
  },
]);

export default router;

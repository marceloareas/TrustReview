/**
 * MainLayout
 *
 * Propósito:
 *  Layout principal da aplicação. Fornece a AppBar fixa no topo e uma área
 *  de conteúdo rolável que envolve as rotas filhas (via <Outlet />).
 *
 * Uso:
 *  - Usado como wrapper nas rotas que precisam da barra superior e do
 *    container de conteúdo padrão.
 *  - Não recebe props; comporta-se como um componente de composição.
 *
 * Comportamento / Observações:
 *  - A AppBar fica acima do conteúdo; a área de conteúdo tem altura
 *    `calc(100vh - 64px)` (64px = altura padrão da AppBar) e overflowY=auto
 *    para permitir scroll independente.
 *  - Ajuste `64px` caso a AppBar tenha altura diferente em temas responsivos.
 *
 */

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
          py: '64px',
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

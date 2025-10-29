/**
 * AppBar
 *
 * Propósito:
 *  Barra superior fixa que exibe um botão de voltar quando não está na raiz ("/")
 *  e um avatar à direita.
 *
 * Uso:
 *  <AppBar /> — componente sem props; usado no layout principal para oferecer
 *  navegação rápida e acesso ao perfil.
 *
 * Entradas:
 *  - Nenhuma prop.
 *
 * Comportamento:
 *  - Determina se está na raiz usando o path atual (window.location.pathname).
 *  - Quando não está na raiz, mostra um botão de voltar que remove o último
 *    segmento do path e navega para o novo caminho com `navigate(newPath)`.
 *  - Observação: atualmente usa `window.location.pathname`; recomenda-se usar
 *    `useLocation()` do react-router-dom para maior reatividade às mudanças de rota.
 *
 * Exemplo:
 *  <AppBar />
 *
 * Notas:
 *  - Depende de @mui/material, @mui/icons-material e react-router-dom.
 *  - A11y: melhorar `aria-label`s (ex.: "Voltar", "Abrir perfil").
 */
import MuiAppBar from "@mui/material/AppBar";
import { Avatar, IconButton, Stack, Tooltip } from "@mui/material";
import { ArrowBack, Logout, Login } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AppBar() {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const isRoot = path === "/";

  const { logout, user } = useAuth();

  const handleNavigate = () => {
    const index = path.lastIndexOf("/");
    const newPath = index !== -1 ? path.slice(0, index) : path;
    navigate(newPath);
  };

  const handleLogout = () => {
    logout();
    //navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <MuiAppBar
      position="sticky"
      sx={{ bgcolor: "secondary.main", color: "text.primary", boxShadow: 1 }}
    >
      <Stack
        direction={"row"}
        width={"100%"}
        spacing={3}
        justifyContent={isRoot ? "flex-end" : "space-between"}
        alignItems={"center"}
        px={2}
      >
        {!isRoot && (
          <IconButton
            size="large"
            aria-label="search"
            color="inherit"
            onClick={() => handleNavigate()}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Stack
          direction={"row"}
          flex={1}
          justifyContent={"flex-end"}
          spacing={2}
        >
          {user ? (
            <>
              <Tooltip title={user.name || "Usuário"}>
                <IconButton size="large" aria-label="Avatar" color="inherit">
                  <Avatar />
                </IconButton>
              </Tooltip>

              <Tooltip title="Sair">
                <IconButton
                  size="large"
                  aria-label="logout"
                  color="inherit"
                  onClick={handleLogout}
                >
                  <Logout />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Entrar">
              <IconButton
                size="large"
                aria-label="login"
                color="inherit"
                onClick={handleLogin}
              >
                <Login />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Stack>
    </MuiAppBar>
  );
}

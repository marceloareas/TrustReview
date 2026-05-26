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
//import vsIcon from "../../assets/icons/vs.png";
import MuiAppBar from "@mui/material/AppBar";
//import { Box } from "@mui/material";
import { Avatar, IconButton, Stack, Tooltip } from "@mui/material";
import { ArrowBack, Logout, Login } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../Snackbar/snackbar";

export default function AppBar() {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const isDefaultPaths = path === "/" || path === "/login" || path === "/register";
  const { showNotification } = useNotification();

  const { logout, user } = useAuth();

  const handleNavigate = () => {
    const index = path.lastIndexOf("/");
    const newPath = index !== -1 ? path.slice(0, index) : path;
    navigate(newPath);
  };

  const handleLogout = () => {
    try {
      logout();
      showNotification("Logout realizado com sucesso!", "success");
    } catch (error) {
      console.log(error);
      showNotification("Erro ao realizar Logout. Tente novamente.", "error");
    }
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
        justifyContent={isDefaultPaths ? "flex-end" : "space-between"}
        alignItems={"center"}
        px={2}
      >
        {!isDefaultPaths && (
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
          alignItems={"center"}
          spacing={3}
        >
          {user ? (
            <>
              <Tooltip title={"Compare produtos"}>
                <IconButton size="large" aria-label="Compare Products" color="inherit" onClick={() => navigate('/compare')}>
                  {/*<Box component={'img'} src={vsIcon} alt={"Versus Icon"} sx={{ width: 30, height: 30 }} />*/}
                  Compare produtos
                </IconButton> 
              </Tooltip> 

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

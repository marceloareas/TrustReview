import "./App.css";
import { ThemeProvider } from "@mui/material";
import { defaultTheme } from "./theme/default";
import AppRouter from "./routes/Router.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { NotificationProvider } from "./components/Snackbar/snackbar.tsx";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <NotificationProvider>
          <AppRouter />
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

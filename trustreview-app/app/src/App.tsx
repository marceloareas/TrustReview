import "./App.css";
import { ThemeProvider } from "@mui/material";
import { defaultTheme } from "./theme/default";
import AppRouter from "./routes/Router.tsx";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;

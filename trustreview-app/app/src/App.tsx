import "./App.css";
import { ThemeProvider } from "@mui/material";
import { defaultTheme } from "./theme/default";
import AppRouter from "./routes/Router.tsx";
import AppBar from "./components/AppBar";


const App = () => {

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar/>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;

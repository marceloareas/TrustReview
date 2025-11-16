/**
 * defaultTheme
 *
 * Propósito:
 *  Fornecer a configuração de tema (palette, typography, components overrides)
 *  usada pela aplicação com base no MUI `createTheme`.
 *
 * Uso:
 *  - Importar `defaultTheme` e passar para o `ThemeProvider` do MUI:
 *      <ThemeProvider theme={defaultTheme}>...</ThemeProvider>
 *
 * Entradas:
 *  - Este arquivo usa `createTheme` para construir um objeto de tema a partir
 *    de valores estáticos (cores, tipografia e overrides de componentes).
 *
 * Saída:
 *  - `defaultTheme`: objeto de tema compatível com MUI (Theme).
 *
 * Comportamento:
 *  - Define `palette` com modo `dark`, cores primárias/ secundárias, variáveis
 *    para background e text, e cores de status (info/success/warning/error).
 *  - Configura `typography` (fontFamily e cores padrão para variantes).
 *  - Aplica `components.styleOverrides` para customizar estilos de botões,
 *    AppBar, TextField, IconButton e Chip.
 */

import {
  createTheme,
  type TypeBackground,
  type TypeText,
} from "@mui/material/styles";

export const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6750A4",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#4A4458",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FEF7FF",
      paper: "#FFFFFF",
      cardContent: "#F3EDF7",
      discard: "rgba(179, 44, 44, 0.79)",
    } as Partial<TypeBackground>,
    text: {
      primary: "#1D1B20",
      secondary: "#49454F",
      tertiary: "#85858fff",
      light: "#FFFFFF",
    } as Partial<TypeText>,
    action: {
      selected: "#6750A4",
      disabled: "#CBC6CC",
    },

    info: {
      main: "#3705eeff",
    },
    success: {
      main: "#62cd3bff",
    },
    warning: {
      main: "#d17a23ff",
    },
    error: {
      main: "#e81616ff",
    },
  },

  typography: {
    fontFamily: '"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: "#1D1B20",
    },
    h2: {
      color: "#1D1B20",
    },
    h3: {
      color: "#1D1B20",
    },
    h4: {
      color: "#1D1B20",
    },
    h5: {
      color: "#1D1B20",
    },
    h6: {
      color: "#1D1B20",
    },
    body1: {
      color: "#1D1B20",
    },
    body2: {
      color: "#1D1B20",
    },
    button: {
      color: "#1D1B20",
      fontWeight: 600,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          textTransform: "none",
          fontWeight: 600,
        },
        contained: {
          backgroundColor: "#6750A4",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#7965AF",
          },
          "&:disabled": {
            backgroundColor: "#CBC6CC",
            color: "#1D1B20",
          },
        },
        outlined: {
          borderColor: "#6750A4",
          color: "#6750A4",
          "&:hover": {
            borderColor: "#7965AF",
            backgroundColor: "rgba(103, 80, 164, 0.08)",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1D1B20",
          color: "#E6E0E9",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF",
            borderRadius: "10px",
            "& input::placeholder": {
              color: "#1D1B20",
            },
            "& fieldset": {
              borderColor: "#D5D5D5",
            },
            "&:hover fieldset": {
              borderColor: "#6750A4",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6750A4",
            },
            "& .MuiInputAdornment-root .MuiSvgIcon-root": {
              color: "#4A4458",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#4A4458",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#6750A4",
          },
          "& input": {
            color: "#1D1B20",
          },
          "& input::placeholder": {
            color: "#4A4458",
            opacity: 1,
          },
          "& textarea": {
            color: "#1E1E1E",
          },
          "& textarea::placeholder": {
            color: "#4A4458",
            opacity: 1,
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#E6E0E9",
          "&:hover": {
            backgroundColor: "rgba(103, 80, 164, 0.12)",
          },
          "&.Mui-disabled": {
            color: "#CBC6CC",
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          color: "#fff",
          fontWeight: 600,
          borderRadius: "8px",
          backgroundColor: "#1D1B20",
        },
      },
    },
  },
});

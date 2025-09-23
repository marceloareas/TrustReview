import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6750A4',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#4A4458',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FEF7FF',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#E6E0E9',
            secondary: '#CAC4D0',
        },
        action: {
            selected: '#6750A4',
            disabled: '#CBC6CC',
        },

        info: {
            main: '#3705eeff',
        },
        success: {
            main: '#62cd3bff',
        },
        warning: {
            main: '#d17a23ff',
        },
        error: {
            main: '#e81616ff',
        },
    },

    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            color: '#E6E0E9',
        },
        h2: {
            color: '#E6E0E9',
        },
        h3: {
            color: '#E6E0E9',
        },
        h4: {
            color: '#E6E0E9',
        },
        h5: {
            color: '#E6E0E9',
        },
        h6: {
            color: '#E6E0E9',
        },
        body1: {
            color: '#E6E0E9',
        },
        body2: {
            color: '#CAC4D0',
        },
        button: {
            color: '#FFFFFF',
            fontWeight: 600,
        },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontWeight: 600,
                },
                contained: {
                    backgroundColor: '#6750A4',
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#7965AF',
                    },
                    '&:disabled': {
                        backgroundColor: '#CBC6CC',
                        color: '#1D1B20',
                    },
                },
                outlined: {
                    borderColor: '#6750A4',
                    color: '#6750A4',
                    '&:hover': {
                        borderColor: '#7965AF',
                        backgroundColor: 'rgba(103, 80, 164, 0.08)',
                    },
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1D1B20',
                    color: '#E6E0E9',
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                        '& fieldset': {
                            borderColor: '#D5D5D5',
                        },
                        '&:hover fieldset': {
                            borderColor: '#6750A4',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#6750A4',
                        },
                        '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                            color: '#4A4458',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#4A4458',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#6750A4',
                    },
                    '& input': {
                        color: '#1D1B20',
                    },
                    '& input::placeholder': {
                        color: '#4A4458',
                        opacity: 1,
                    },
                },
            },
        },

        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#E6E0E9',
                    '&:hover': {
                        backgroundColor: 'rgba(103, 80, 164, 0.12)',
                    },
                    '&.Mui-disabled': {
                        color: '#CBC6CC',
                    },
                },
            },
        },
    },
});
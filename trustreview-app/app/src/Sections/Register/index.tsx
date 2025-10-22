import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  CardActions,
  CardContent,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import AppTitle from "../../components/AppTitle";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
<<<<<<< HEAD
import { useState } from "react";
=======
import { createUserSchema } from "./schema";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
>>>>>>> 951b71f9b9cb4d4207f21983ab5c8386cb91f050

interface CreateUserForm {
  name: string;
  email: string;
  password: string;
}

const RegisterSection = () => {
  const { register, authorized } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserForm>({
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

<<<<<<< HEAD
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const onSubmit = async (data: CreateUserForm) => {
    try {
      const user = await userService.createUser(data);
      console.log("Usuário criado:", user);

      setSnackbarMessage("Usuário criado com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      reset(); // limpa os campos
    } catch (error: any) {
      console.log("Erro completo:", error);

      // Caso o backend tenha retornado um objeto Axios (com response)
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (status === 409 || data?.errorCode === "USER_EMAIL_ALREADY_EXISTS") {
          setSnackbarMessage(data?.message || "Email já está em uso!");
        } else if (status === 400) {
          setSnackbarMessage("Erro de validação. Verifique os campos.");
        } else {
          setSnackbarMessage(
            data?.message || "Erro inesperado ao criar o usuário."
          );
        }
      }
      // Caso o erro tenha sido transformado em Error simples (sem response)
      else if (error.message?.includes("Email de usuário já em uso")) {
        setSnackbarMessage("Email já está em uso!");
      } else {
        setSnackbarMessage("Erro inesperado ao criar o usuário.");
      }

      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
=======
  const onSubmit = (data: CreateUserForm) => {
    register(data.email, data.password);
>>>>>>> 951b71f9b9cb4d4207f21983ab5c8386cb91f050
  };

  useEffect(() => {
    if (authorized) {
      navigate("/");
      reset();
    }
  }, [authorized]);

  return (
    <Container maxWidth="sm">
      <Stack
        flex={1}
        spacing={4}
        justifyContent="center"
        alignItems="center"
        height="100vh"
        mt="-64px"
      >
        <AppTitle />

        <Card sx={{ width: "100%", p: 2, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={600}
              gutterBottom
              textAlign="center"
            >
              Cadastro
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              gutterBottom
              textAlign="center"
            >
              Já possui uma conta?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                Faça login
              </Link>
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nome"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Senha"
                      type="password"
                      fullWidth
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </Stack>

              <CardActions sx={{ mt: 2, p: 0 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Cadastrar
                </Button>
              </CardActions>
            </Box>
          </CardContent>
        </Card>
      </Stack>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterSection;

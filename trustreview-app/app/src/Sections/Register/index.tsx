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
} from "@mui/material";
import AppTitle from "../../components/AppTitle";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchema } from "./schema";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../components/Snackbar/snackbar";
import { useEffect } from "react";

interface CreateUserForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterSection = () => {
  const { register, authorized } = useAuth();
  const { showNotification } = useNotification();
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
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: CreateUserForm) => {
    console.log(data);
    try {
      await register(data.name, data.email, data.password);
      showNotification("Conta criada com sucesso!", "success");
    } catch (error) {
      showNotification("Erro ao criar conta. Tente novamente.", "error");
    }
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

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Confirmar senha"
                      type="password"
                      fullWidth
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
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
    </Container>
  );
};

export default RegisterSection;

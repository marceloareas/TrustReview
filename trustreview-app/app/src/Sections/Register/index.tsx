import { useState } from "react";
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

const RegisterSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", { email, password });
  };

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
              Já possui uma conta? Faça Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2}>
                <TextField
                  label="Nome"
                  type="nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                />
              </Stack>
              <CardActions sx={{ mt: 2, p: 0 }}>
                <Button type="submit" variant="contained" fullWidth>
                  Login
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

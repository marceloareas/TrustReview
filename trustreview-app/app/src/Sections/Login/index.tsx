import { useEffect, useState } from "react";
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
import { useAuth } from "../../hooks/useAuth";

const LoginSection = () => {
  const { login, authorized } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (authorized) {
      navigate("/");
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
              Login
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              gutterBottom
              textAlign="center"
            >
              Ainda não tem uma conta?{" "}
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                Cadastre-se
              </Link>
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2}>
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

export default LoginSection;

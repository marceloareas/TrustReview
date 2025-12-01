import {
  Box,
  Button,
  Container,
  Rating,
  Stack,
  Typography,
  Chip,
} from "@mui/material";

const mockProducts = [
  {
    id: "1",
    name: "Name",
    imageUrl: "",
    rating: 5,
    reviewsCount: 21,
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    createdAt: "2024-01-01",
    updatedAt: "2024-02-01",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    pros: [
      "Lorem ipsum dolor sit",
      "incididunt ut labore",
      "dolore magna aliqua",
      "Ut enim ad minim veniam",
    ],
    cons: [
      "Lorem ipsum dolor sit",
      "amet, consectetur",
      "eiusmod tempor",
      "incididunt ut labore",
    ],
  },
  {
    id: "2",
    name: "Name",
    imageUrl: "",
    rating: 5,
    reviewsCount: 21,
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    createdAt: "2024-01-01",
    updatedAt: "2024-02-01",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    pros: [
      "Lorem ipsum dolor sit",
      "amet, consectetur",
      "adipiscing elit, sed do",
      "eiusmod tempor",
    ],
    cons: [
      "Lorem ipsum dolor sit",
      "amet, consectetur",
      "adipiscing elit, sed do",
      "incididunt ut labore",
    ],
  },
];

export default function CompareProductsMock() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        justifyContent="center"
        width="100%"
      >
        {mockProducts.map((p) => (
          <Stack
            key={p.id}
            spacing={2}
            sx={{
              borderRadius: 3,
              flex: 1,
              maxWidth: "50%",
            }}
          >
            {/* IMAGEM */}
            <Box
              sx={{
                width: 140,
                height: 140,
                bgcolor: "#eee",
                borderRadius: 3,
              }}
            />

            {/* NOME */}
            <Typography variant="h5" fontWeight={500}>
              {p.name}
            </Typography>

            {/* RATING */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Rating value={p.rating} readOnly />
              <Typography variant="body2">{p.rating}</Typography>
              <Typography variant="body2" color="text.secondary">
                ({p.reviewsCount})
              </Typography>
            </Stack>

            {/* TAGS */}
            <Typography variant="body2" fontWeight={600}>
              Tags
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {p.tags.map((t) => (
                <Chip key={t} label={t} size="small" />
              ))}
            </Stack>

            {/* DATAS */}
            <Typography variant="caption" color="text.secondary">
              Data de Edição • Data de Criação
            </Typography>

            {/* DESCRIÇÃO */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: "pre-line" }}
            >
              {p.description}
            </Typography>

            {/* PROS */}
            <Typography variant="body2" fontWeight={600}>
              Pros
            </Typography>
            <ul style={{ marginTop: 0 }}>
              {p.pros.map((pro, idx) => (
                <li key={idx}>
                  <Typography variant="body2">{pro}</Typography>
                </li>
              ))}
            </ul>

            {/* CONS */}
            <Typography variant="body2" fontWeight={600}>
              Contras
            </Typography>
            <ul style={{ marginTop: 0 }}>
              {p.cons.map((con, idx) => (
                <li key={idx}>
                  <Typography variant="body2">{con}</Typography>
                </li>
              ))}
            </ul>

            {/* BOTÃO */}
            <Button
              variant="contained"
              fullWidth
              sx={{ borderRadius: 20, mt: 2 }}
            >
              Ver Produto
            </Button>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}

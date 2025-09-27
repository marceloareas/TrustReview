import { Box, Container } from "@mui/material";
import SearchSection from "../Sections/Search";

const SearchPage = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          p: 2,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ width: "100%", textAlign: "center", mb: "15%" }}>
            <SearchSection />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SearchPage;

import { Box } from "@mui/material";
import SearchSection from "../Sections/Search";

const SearchPage = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <Box sx={{ width: "100%", textAlign: "center", mb: "10%" }}>
          <SearchSection />
        </Box>
      </Box>
    </>
  );
};

export default SearchPage;

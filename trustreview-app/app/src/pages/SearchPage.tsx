import { Stack } from "@mui/material";
import SearchSection from "../Sections/Search";

const SearchPage = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.default",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SearchSection />
    </Stack>
  );
};

export default SearchPage;

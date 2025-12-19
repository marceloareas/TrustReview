import SearchSection from "../Sections/Search";
import { Stack } from "@mui/material";

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

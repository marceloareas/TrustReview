import MuiAppBar from "@mui/material/AppBar";
import { Avatar, IconButton, Stack } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function AppBar() {
  const isRoot = window.location.pathname === "/";

  return (
    <MuiAppBar
      position="sticky"
      sx={{ bgcolor: "secondary.main", color: "text.primary", boxShadow: 1 }}
    >
      <Stack
        direction={"row"}
        spacing={3}
        justifyContent={isRoot ? "flex-end" : "space-between"}
        alignItems={"center"}
        px={2}
      >
        {!isRoot && (
          <IconButton size="large" aria-label="search" color="inherit">
            <ArrowBack />
          </IconButton>
        )}
        <IconButton size="large" aria-label="search" color="inherit">
          <Avatar />
        </IconButton>
      </Stack>
    </MuiAppBar>
  );
}

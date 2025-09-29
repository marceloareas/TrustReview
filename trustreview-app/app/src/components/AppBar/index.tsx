import MuiAppBar from "@mui/material/AppBar";
import { Avatar, IconButton, Stack } from "@mui/material";
import { ArrowBack, AddBox } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function AppBar() {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const isRoot = path === "/";

  const handleNavigate = () => {
    const index = path.lastIndexOf("/");
    const newPath = index !== -1 ? path.slice(0, index) : path;
    navigate(newPath);
  };

  return (
    <MuiAppBar
      position="sticky"
      sx={{ bgcolor: "secondary.main", color: "text.primary", boxShadow: 1 }}
    >
      <Stack
        direction={"row"}
        width={"100%"}
        spacing={3}
        justifyContent={isRoot ? "flex-end" : "space-between"}
        alignItems={"center"}
        px={2}
      >
        {!isRoot && (
          <IconButton
            size="large"
            aria-label="search"
            color="inherit"
            onClick={() => handleNavigate()}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Stack
          direction={"row"}
          flex={1}
          justifyContent={"flex-end"}
          spacing={2}
        >
          <IconButton size="large" aria-label="Add" color="inherit">
            <AddBox sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton size="large" aria-label="Avatar" color="inherit">
            <Avatar />
          </IconButton>
        </Stack>
      </Stack>
    </MuiAppBar>
  );
}

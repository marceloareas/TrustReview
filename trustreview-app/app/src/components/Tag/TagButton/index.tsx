import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface TagButtonProps {
  onClick?: () => void;
  onModalClick?: () => void;
}

const TagButton = ({ onClick,onModalClick }: TagButtonProps) => {
  return (
    <>

      <Box
        onClick={(e) => { e.stopPropagation(); onClick?.(); onModalClick?.(); }}
        sx={{
          backgroundColor: "transparent",
          border: '1px solid #1D1B20',
          boxShadow: 1,
          borderRadius: "8px",
          px: 2.250,
          py: 0.125,
          display: "flex",
          justifyContent: "center",
          "&:hover": { transform: "scale(1.02)" },
          cursor: "pointer",
        }}
      >
        <AddIcon sx={{ color: 'text.primary', alignSelf: 'center', justifySelf: 'center' }} />
      </Box>
    </>
  );
};

export default TagButton;
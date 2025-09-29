import { Chip, Stack } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const LikeOrNot = ({ onClick }: { onClick: (opt: string) => void }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <Chip
        icon={<ThumbUpOffAltIcon />}
        onClick={() => onClick("like")}
        label="0"
        sx={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRight: "none",
          color: "primary.contratText",
        }}
      />
      <Chip
        icon={<ThumbDownOffAltIcon />}
        onClick={() => onClick("dislike")}
        label="0"
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderRight: "none",
        }}
      />
    </Stack>
  );
};

export default LikeOrNot;

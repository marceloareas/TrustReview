// LikeOrNot.tsx
import { Chip, Stack } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const LikeOrNot = ({
  isLike,
  isDislike,
  likesCount = 0,
  dislikesCount = 0,
  onClick,
}: {
  isLike: boolean;
  isDislike: boolean;
  likesCount?: number;
  dislikesCount?: number;
  onClick: (opt: "like" | "dislike") => void;
}) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <Chip
        icon={<ThumbUpOffAltIcon />}
        onClick={() => onClick("like")}
        label={likesCount}
        sx={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRight: "none",
          color: isLike ? "#fff" : "inherit",
          backgroundColor: isLike ? "#E01B68" : "none",
          "&:hover": {
            backgroundColor: isLike ? "#E01B68" : "#251846ff",
            color: "#fff",
          },
        }}
      />

      <Chip
        icon={<ThumbDownOffAltIcon />}
        onClick={() => onClick("dislike")}
        label={dislikesCount}
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          color: isDislike ? "#fff" : "inherit",
          backgroundColor: isDislike ? "#E01B68" : "none",
          "&:hover": {
            backgroundColor: isDislike ? "#E01B68" : "#251846ff",
            color: "#fff",
          },
        }}
      />
    </Stack>
  );
};

export default LikeOrNot;

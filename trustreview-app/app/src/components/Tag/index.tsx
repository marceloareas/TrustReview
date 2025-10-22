import Chip from "@mui/material/Chip";

export default function Tag({
  label,
  isEdit,
  handleDelete,
}: {
  label?: string;
  isEdit?: boolean;
  handleDelete?: () => void;
}) {
  return (
    <Chip
      label={label}
      onDelete={isEdit ? handleDelete : undefined}
      sx={{
        color: "text.light",
        "& .MuiChip-deleteIcon": {
          color: "text.light",
          "&:hover": { color: "text.tertiary" },
        },
      }}
    />
  );
}

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
  return <Chip label={label} onDelete={isEdit ? handleDelete : undefined} />;
}

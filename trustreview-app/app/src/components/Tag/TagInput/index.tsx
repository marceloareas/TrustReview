import { Chip, Divider, InputBase, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import type { ITag } from "../../../interfaces/Product";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface TagInputProps {
  isCreating?: boolean;
  setIsCreating?: (value: boolean) => void;
  onCreate?: (tag: ITag) => void;
}

const TagInput = ({ isCreating, setIsCreating, onCreate }: TagInputProps) => {
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isCreating) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isCreating]);

  if (!isCreating) {
    return null;
  }

  const handleCancel = () => {
    setInputName("");
    setInputDescription("");
    setIsCreating?.(false);
  };

  const confirmCreate = () => {
    const name = inputName.trim();
    const description = inputDescription.trim();
    if (name) {
      onCreate?.({ name, description: description || "" });
      setInputName("");
      setInputDescription("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      confirmCreate();
      setIsCreating?.(false);
    } else if (e.key === "Escape") {
      setInputName("");
      setInputDescription("");
    }
  };

  return (
    <>
      <Chip
        clickable
        onDelete={handleCancel}
        sx={{
          "& .MuiChip-deleteIcon": {
            color: "text.light",
            fontSize: "1.25rem",
          },
          "&:hover": {
            backgroundColor: "primary.main",
          },
          "&:focus-within": {
            backgroundColor: "primary.main",
          },
          "& .MuiInputBase-input": { color: "text.light" },
          "& .MuiChip-label": {
            width: '100%',
            padding: '4px 8px',
          },
          justifyContent: "space-between",
        }}
        label={
          <Stack direction="row" spacing={1} justifyContent={"space-between"} alignItems="center">
            <InputBase
              inputRef={inputRef}
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                fontSize: "0.875rem",
                flex: 1,
                minWidth: 0
              }}
              placeholder="Nome"
            />
            <Divider orientation="vertical" flexItem sx={{ height: '20px', alignSelf: 'center' }} />
            <InputBase
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                fontSize: "0.875rem",
                flex: 1,
                minWidth: 0
              }}
              placeholder="Descrição (opcional)"
            />
            <CheckCircleIcon
              onClick={confirmCreate}
              sx={{
                cursor: "pointer",
                color: "text.light",
                fontSize: "1.25rem",
                ':hover': { color: 'secondary.main' },
                flexShrink: 0
              }}
            />
          </Stack>
        }
      />
    </>
  );
};

export default TagInput;

import { Box, Chip, Divider, InputBase, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import type { ITag } from "../../../interfaces/Product";

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
          },
          "&:hover": {
            backgroundColor: "primary.main",
          },
          "&:focus-within": {
            backgroundColor: "primary.main",
          },
          "& .MuiInputBase-input": { color: "text.light" },
          justifyContent: "space-between",
        }}
        label={
          <Stack direction="row" spacing={2}>
            <InputBase
              inputRef={inputRef}
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                fontSize: "0.875rem",
              }}
              placeholder="Nome"
            />
            <Box
              display="flex"
              alignItems="center"
              sx={{ color: "text.light" }}
            >
              <Divider orientation="vertical" flexItem />
            </Box>
            <InputBase
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                fontSize: "0.875rem",
              }}
              placeholder="Descrição (opcional)"
            />
          </Stack>
        }
      />
    </>
  );
};

export default TagInput;

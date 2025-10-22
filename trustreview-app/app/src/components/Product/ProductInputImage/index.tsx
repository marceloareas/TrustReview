import { Box, Stack } from "@mui/material";
import type { ChangeEvent } from "react";
import PhotoIcon from "../../../assets/icons/photoIcon.svg";

interface ProductInputImageProps {
  imageUrl?: string;
  onChange?: (file: File | null) => void;
}

const ProductImageInput = ({ imageUrl, onChange }: ProductInputImageProps) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (onChange) onChange(file);
  };

  return (
    <Stack
      component="label"
      htmlFor="product-image-input"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 200,
        height: 200,
        borderRadius: "8px",
        boxShadow: 3,
        cursor: "pointer",
        mb: 2,
        overflow: "hidden",
        "&:hover": { transform: "scale(1.01)" },
      }}>
      <Box
        sx={{
          width: imageUrl ? "100%" : "80px",
          height: imageUrl ? "100%" : "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Box
          component="img"
          src={imageUrl || PhotoIcon}
          alt="Preview"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <input
          id="product-image-input"
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </Box>
    </Stack>
  );
};

export default ProductImageInput;

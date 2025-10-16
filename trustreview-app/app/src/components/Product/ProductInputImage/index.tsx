// components/Product/ProductInputImage.tsx
import { Box, Button } from "@mui/material";
import type { ChangeEvent } from "react";

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
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        component="img"
        src={imageUrl || "/placeholder.png"}
        alt="Preview"
        sx={{
          width: 200,
          height: 200,
          borderRadius: "8px",
          objectFit: "cover",
          border: "1px solid #ccc",
          mb: 2,
        }}
      />
      <Button variant="contained" component="label">
        Escolher Imagem
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>
    </Box>
  );
};

export default ProductImageInput;

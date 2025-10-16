import { useState, useRef } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

interface ProductImageInputProps {
  imageUrl?: string;
  name?: string;
  onImageChange?: (file: File | null) => void;
}

const ProductInputImage = ({
  imageUrl,
  name,
  onImageChange,
}: ProductImageInputProps) => {
  const [preview, setPreview] = useState<string | null>(imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onImageChange?.(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onImageChange?.(null);
  };

  return (
    <Stack alignItems="center" spacing={2}>
      <Typography variant="h6">{name || "Product Image"}</Typography>

      <Box
        sx={{
          width: 240,
          height: 240,
          borderRadius: 4,
          border: "2px dashed #ccc",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafafa",
          position: "relative",
        }}
      >
        {preview ? (
          <Box
            component="img"
            src={preview}
            alt="Product preview"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            Nenhuma imagem selecionada
          </Typography>
        )}
      </Box>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? "Alterar Imagem" : "Enviar Imagem"}
        </Button>
        {preview && (
          <Button variant="outlined" color="error" onClick={handleRemove}>
            Remover
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default ProductInputImage;

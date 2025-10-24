/**
 * ProductImageInput
 *
 * Propósito:
 *  Componente de input para seleção e pré-visualização de imagens de produto.
 *  Permite que o usuário clique no card, selecione uma imagem do dispositivo
 *  e veja o preview imediatamente.
 *
 * Uso:
 *  <ProductImageInput
 *    imageUrl={urlDaImagemExistente}
 *    onChange={(file) => console.log("Arquivo selecionado:", file)}
 *  />
 *
 * Entradas (props):
 *  - imageUrl?: string — URL da imagem existente a ser exibida no preview.
 *  - onChange?: (file: File | null) => void — callback chamado quando o usuário
 *    seleciona um arquivo. Recebe o arquivo selecionado ou `null` se removido.
 *
 * Comportamento:
 *  - Renderiza um container clicável (`Stack`) estilizado como um card de 200x200px.
 *  - Ao clicar, abre o seletor de arquivos do navegador (input `type="file"` oculto).
 *  - Mostra a imagem selecionada (`imageUrl`) ou um ícone padrão (`PhotoIcon`) se não houver imagem.
 *  - Aplica efeito hover leve (`scale(1.01)`) para feedback visual.
 *  - O arquivo selecionado é passado via `onChange` para o componente pai.
 *
 * Observações:
 *  - Aceita apenas arquivos de imagem (`accept="image/*"`).
 *  - A pré-visualização utiliza `objectFit: "cover"` para preencher o container mantendo proporção.
 *  - Ideal para formulários de criação ou edição de produto.
 *  - A11y: `alt="Preview"` fornece contexto para leitores de tela.
 *
 * Dependências:
 *  - @mui/material: Box, Stack
 *  - React: ChangeEvent
 *  - assets/icons/photoIcon.svg: ícone padrão quando não há imagem
 */
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
      }}
    >
      <Box
        sx={{
          width: imageUrl ? "100%" : "80px",
          height: imageUrl ? "100%" : "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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

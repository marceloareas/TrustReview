/**
 * TagButton
 *
 * Propósito:
 *  Botão de adição de tags usado em modos de edição. Permite disparar ações
 *  quando o usuário deseja criar ou abrir modal para uma nova tag.
 *
 * Uso:
 *  <TagButton
 *    isEditMode={true}
 *    onClick={() => console.log("Tag adicionada")}
 *    onModalClick={() => setModalOpen(true)}
 *  />
 *
 * Entradas (props):
 *  - onClick?: () => void — função chamada ao clicar no botão.
 *  - onModalClick?: () => void — função opcional chamada ao clicar no botão,
 *    geralmente para abrir um modal de criação de tag.
 *  - isEditMode?: boolean — define se o botão será renderizado; se falso, nada
 *    é exibido.
 *
 * Comportamento:
 *  - Renderiza um `Box` estilizado com borda, sombra e cantos arredondados.
 *  - Contém um ícone `AddIcon` centralizado.
 *  - Aplica efeito hover leve (`scale(1.02)`) para feedback visual.
 *  - O clique no botão dispara as funções `onClick` e `onModalClick` (se fornecidas)
 *    e previne propagação de eventos (`stopPropagation`).
 *  - Se `isEditMode` for falso ou indefinido, o componente não é renderizado.
 *
 * Observações:
 *  - Dependências: @mui/material (Box), @mui/icons-material (AddIcon).
 *  - Ideal para uso em grids ou listas de tags em páginas de edição de produtos.
 *  - A11y: considerar adicionar `aria-label` caso seja necessário suporte a leitores de tela.
 */
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface TagButtonProps {
  onClick?: () => void;
  onModalClick?: () => void;
  isEditMode?: boolean;
}

const TagButton = ({ onClick, onModalClick, isEditMode }: TagButtonProps) => {
  if (!isEditMode) {
    return null;
  }

  return (
    <>
      <Box
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
          onModalClick?.();
        }}
        sx={{
          backgroundColor: "transparent",
          border: "1px solid #1D1B20",
          boxShadow: 1,
          borderRadius: "8px",
          px: 2.25,
          py: 0.125,
          display: "flex",
          justifyContent: "center",
          "&:hover": { transform: "scale(1.02)" },
          cursor: "pointer",
        }}
      >
        <AddIcon
          sx={{
            color: "text.primary",
            alignSelf: "center",
            justifySelf: "center",
          }}
        />
      </Box>
    </>
  );
};

export default TagButton;

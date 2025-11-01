/**
 * Tag
 *
 * Propósito:
 *  Componente para exibir uma tag individual, com suporte opcional para
 *  exclusão quando em modo de edição.
 *
 * Uso:
 *  <Tag
 *    label="Novo"
 *    isEdit={true}
 *    handleDelete={() => console.log("Tag deletada")}
 *  />
 *
 * Entradas (props):
 *  - label?: string — texto exibido na tag.
 *  - isEdit?: boolean — se verdadeiro, permite excluir a tag.
 *  - handleDelete?: () => void — função chamada quando o usuário clica no
 *    ícone de exclusão (apenas se `isEdit` for verdadeiro).
 *
 * Comportamento:
 *  - Renderiza um `Chip` do Material UI com o texto da tag.
 *  - Quando `isEdit` é verdadeiro, exibe o ícone de exclusão e chama
 *    `handleDelete` ao clicar.
 *  - Estiliza o Chip e o ícone de exclusão com cores específicas e efeito hover.
 *
 * Observações:
 *  - Dependências: @mui/material (Chip).
 *  - Ideal para listas de tags em formulários de produtos, categorias ou filtros.
 *  - A11y: considerar adicionar `aria-label` para suporte a leitores de tela.
 */
import Chip from "@mui/material/Chip";
import { Tooltip } from "@mui/material";
import type { ITag } from "../../interfaces/Product";

export default function Tag({
  tag,
  isEdit,
  handleDelete,
}: {
  tag?: ITag;
  isEdit?: boolean;
  handleDelete?: () => void;
}) {
  return (
    <Tooltip title={tag?.description || ""} arrow placement="top">
      <Chip
        label={tag?.name || ""}
        onDelete={isEdit ? handleDelete : undefined}
        sx={{
          color: "text.light",
          "& .MuiChip-deleteIcon": {
            color: "text.light",
            "&:hover": { color: "text.tertiary" },
          },
        }}
      />
    </Tooltip>
  );
}

/**
 * TagsList
 *
 * Propósito:
 *  Componente para exibir uma lista de tags de produtos em linha, com suporte
 *  a edição e adição de novas tags. Permite abrir um diálogo de criação de tags
 *  ou exibir um input inline, dependendo da configuração.
 *
 * Uso:
 *  <TagsList
 *    tags={tagsArray}
 *    isEdit={true}
 *    showDialog={true}
 *  />
 *
 * Entradas (props):
 *  - tags: ITag[] — array de tags a serem exibidas.
 *  - isEdit?: boolean — se verdadeiro, permite a edição (adicionar/remover tags).
 *  - showDialog?: boolean — se verdadeiro, abre um diálogo (`DialogTag`) para
 *    criação de novas tags; se falso, mostra um input inline para adicionar tags.
 *
 * Comportamento:
 *  - Renderiza uma `Stack` horizontal com rolagem lateral (`overflowX: auto`) para as tags.
 *  - Quando `isEdit` é verdadeiro, renderiza um `TagButton` que abre o diálogo
 *    ou input inline, dependendo de `showDialog`.
 *  - Cada tag é exibida com o componente `Tag`, permitindo exclusão no modo edição.
 *  - Gerencia estado interno para abrir o diálogo (`openDialog`) e exibir input inline (`showInlineInput`).
 *
 * Observações:
 *  - Dependências: @mui/material (Stack, Box), componentes internos `Tag`, `TagButton`, `DialogTag`.
 *  - Ideal para seções de formulários de produtos, categorias ou filtros.
 *  - A11y: tags e botões interativos devem ter `aria-label` ou título para leitores de tela.
 */

import { Stack, Box } from "@mui/material";
import Tag from "..";
import type { ITag } from "../../../interfaces/Product";

import { useState } from "react";
import TagButton from "../TagButton";
import DialogTag from "../DialogTag";

const TagsList = ({
  tags,
  isEdit,
  showDialog = true,
}: {
  tags: ITag[];
  isEdit?: boolean;
  showDialog?: boolean;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [showInlineInput, setShowInlineInput] = useState(false);

  const handleDelete = (tagId: string) => {
    console.log(`Delete clicked for tag: ${tagId}`);
  };

  return (
    <>
      <Stack spacing={2} width={"100%"} direction={"row"}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            width: "100%",
            overflowX: "auto",
            p: 0.5,
          }}
        >
          {isEdit && (
            <Box sx={{ flex: "0 0 auto" }}>
              <TagButton
                isEditMode={isEdit}
                onClick={() => {
                  if (showDialog) {
                    setOpenDialog(true);
                  } else {
                    setShowInlineInput(true);
                  }
                }}
              />
            </Box>
          )}

          {tags.map((tag) => (
            <Box key={tag.id} sx={{ flex: "0 0 auto" }}>
              <Tag
                label={tag.name}
                isEdit={isEdit}
                handleDelete={() => handleDelete(tag.id || "")}
              />
            </Box>
          ))}

          {showInlineInput && (
            <Box sx={{ flex: "0 0 auto" }}>
              <Tag isEdit />
            </Box>
          )}
        </Box>
      </Stack>

      {showDialog && (
        <DialogTag
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onCreateTag={() => {}}
          tags={tags}
        />
      )}
    </>
  );
};

export default TagsList;

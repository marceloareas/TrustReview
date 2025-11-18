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

import { useState, type Dispatch, type SetStateAction } from "react";
import TagButton from "../TagButton";
import DialogTag from "../DialogTag";

const TagsList = ({
  tags,
  currentTagsList,
  setCurrentTagsList,
  isEdit,
  showDialog = true,
}: {
  tags: ITag[];
  currentTagsList?: ITag[];
  setCurrentTagsList?: Dispatch<SetStateAction<ITag[]>>;
  isEdit?: boolean;
  showDialog?: boolean;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showInlineCreator, setShowInlineCreator] = useState(false);

  const toggleTagSelection = (tag: ITag) => {
    // adiciona se não existe; remove se já existe
    if (!currentTagsList?.some((t) => t.name === tag.name)) {
      setCurrentTagsList?.((prev) => (prev ? [...prev, tag] : [tag]));
      return;
    }

    setCurrentTagsList?.((prev) => prev?.filter((t) => t.name !== tag.name));
  };

  const addTagToSelection = (tag: ITag) => {
    setCurrentTagsList?.((prev) => (prev ? [...prev, tag] : [tag]));
  };

  const removeTagByName = (tagName: string) => {
    setCurrentTagsList?.((prev) => prev.filter((tag) => tag.name !== tagName));
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
                    setIsDialogOpen(true);
                  } else {
                    setShowInlineCreator(true);
                  }
                }}
              />
            </Box>
          )}

          {(() => {
            const displayedTags = currentTagsList || tags;
            return displayedTags.map((tag) => (
              <Box key={tag.name} sx={{ flex: "0 0 auto" }}>
                <Tag
                  tag={tag}
                  handleDelete={() => removeTagByName(tag.name || "")}
                />
              </Box>
            ));
          })()}

          {showInlineCreator && (
            <Box sx={{ flex: "0 0 auto" }}>
              <Tag isEdit />
            </Box>
          )}
        </Box>
      </Stack>

      {showDialog && (
        <DialogTag
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onCreateTag={(tag) => addTagToSelection(tag)}
          onSelectTag={(tag) => toggleTagSelection(tag)}
          tags={[
            ...tags,
            ...(currentTagsList || []).filter(
              (ct) => !tags.some((t) => t.name === ct.name),
            ),
          ]}
          currentTagsList={currentTagsList}
        />
      )}
    </>
  );
};

export default TagsList;

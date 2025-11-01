/**
 * DialogTag
 *
 * Propósito:
 *  Componente de diálogo para exibir, buscar e criar tags de produtos.
 *  Permite ao usuário visualizar tags existentes, adicionar novas e interagir
 *  com elas de forma organizada.
 *
 * Uso:
 *  <DialogTag
 *    open={isDialogOpen}
 *    onClose={() => setDialogOpen(false)}
 *    tags={tagsArray}
 *    onCreateTag={(name) => console.log("Nova tag:", name)}
 *  />
 *
 * Entradas (props):
 *  - open: boolean — define se o diálogo está aberto ou fechado.
 *  - onClose: () => void — função chamada ao fechar o diálogo.
 *  - tags: ITag[] — lista de tags existentes para exibição.
 *  - onCreateTag?: (name: string) => void — callback opcional chamado quando
 *    o usuário cria uma nova tag. Recebe o nome da tag criada.
 *
 * Comportamento:
 *  - Exibe um `Dialog` do Material UI com largura máxima `sm` e fullWidth.
 *  - Contém um campo de busca (`Search`) para digitar o nome da nova tag.
 *  - Pressionar Enter ou confirmar a busca adiciona a tag usando `onCreateTag`.
 *  - Renderiza um botão de edição (`TagButton`) e as tags existentes em um grid
 *    responsivo (`display: grid` com `auto-fill` e `minmax`).
 *  - Limpa o input de busca após criar uma nova tag.
 *
 * Observações:
 *  - Dependências: @mui/material (Dialog, DialogContent, Stack, Chip, Box),
 *    componentes internos `Search` e `TagButton`.
 *  - Ideal para formulários de criação/edição de produtos ou categorias.
 *  - A11y: o diálogo é acessível via teclado e foco automático ao abrir o input.
 */
import { Dialog, DialogContent, Stack, Box } from "@mui/material";
import TagButton from "../TagButton";
import Search from "../../Search";
import TagInput from "../TagInput";
import type { ITag } from "../../../interfaces/Product";
import { useSearch } from "../../../hooks/useSearch";
import { useState, useEffect } from "react";
import Tag from "..";

export default function DialogTag({
  open,
  onClose,
  tags,
  currentTagsList,
  onCreateTag,
  onSelectTag,
}: {
  open: boolean;
  onClose: () => void;
  tags: ITag[];
  currentTagsList?: ITag[];
  onCreateTag?: (tag: ITag) => void;
  onSelectTag: (tag: ITag) => void;
}) {
  const { filteredItems, searchTerm, setSearchTerm } = useSearch(tags, [
    "name",
    "description",
  ]);
  const visibleTags = filteredItems;
  const [isCreating, setIsCreating] = useState(false);
  const selectedTagNames = currentTagsList?.map((tag) => tag.name) || [];

  const enterCreateMode = () => {
    setIsCreating(true);
  };

  useEffect(() => {
    if (!open) {
      setIsCreating(false);
      setSearchTerm("");
    }
  }, [open, setSearchTerm]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Search
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: ` repeat(auto-fill, minmax(${isCreating ? "100%" : 120}px, 1fr))`,
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box>
              <TagButton isEditMode={true} onClick={enterCreateMode} />
            </Box>
            <TagInput
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              onCreate={({ name, description }) => {
                onCreateTag?.({ name, description });
                setIsCreating(false);
              }}
            />

            {visibleTags.map((tag) => (
              <Tag
                key={tag.id || tag.name}
                tag={tag}
                isEdit
                onClick={() => {
                  onSelectTag(tag);
                }}
                isSelected={selectedTagNames.includes(tag.name)}
              />
            ))}
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

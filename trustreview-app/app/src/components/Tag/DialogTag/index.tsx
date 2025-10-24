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
import { Dialog, DialogContent, Stack, Chip, Box } from "@mui/material";
import { useState } from "react";
import type { ITag } from "../../../interfaces/Product";
import TagButton from "../TagButton";
import Search from "../../Search";

export default function DialogTag({
  open,
  onClose,
  tags,
  onCreateTag,
}: {
  open: boolean;
  onClose: () => void;
  tags: ITag[];
  onCreateTag?: (name: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onCreateTag?.(trimmed);
    setValue("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Search
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            handleSearchSubmit={handleAdd}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box>
              <TagButton isEditMode={true} />
            </Box>

            {tags.map((t) => (
              <Chip key={t.id || t.name} label={t.name} sx={{ p: 0 }} />
            ))}
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

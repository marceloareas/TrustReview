/**
 * LikeOrNot
 *
 * Propósito:
 *  Exibir dois botões interativos (curtir e não curtir) com contadores e ícones correspondentes.
 *  Permite ao usuário expressar aprovação ("like") ou desaprovação ("dislike") em um item (ex.: comentário, review, etc.).
 *
 * Uso:
 *  <LikeOrNot
 *    isLike={true}
 *    isDislike={false}
 *    likesCount={10}
 *    dislikesCount={2}
 *    onClick={(opt) => console.log(opt)}
 *  />
 *
 * Entradas (props):
 *  - isLike: boolean — indica se o botão "like" está ativo (selecionado).
 *  - isDislike: boolean — indica se o botão "dislike" está ativo (selecionado).
 *  - likesCount: number (opcional) — número total de curtidas (padrão: 0).
 *  - dislikesCount: number (opcional) — número total de não curtidas (padrão: 0).
 *  - onClick: função (opt: "like" | "dislike") => void — callback chamado ao clicar em um dos botões.
 *
 * Comportamento:
 *  - Renderiza dois `Chip`s do Material UI lado a lado:
 *      • O primeiro representa o botão de "like" (ícone de joinha).
 *      • O segundo representa o botão de "dislike" (ícone de joinha invertido).
 *  - Cada botão exibe o contador correspondente (`likesCount`, `dislikesCount`).
 *  - O botão ativo muda de cor para destacar a seleção (`#E01B68`).
 *  - Ao clicar em um dos botões, é chamado `onClick("like")` ou `onClick("dislike")`.
 *  - O estilo de bordas e cores é ajustado para parecer um controle único com dois lados.
 *
 * Observações:
 *  - A cor `#E01B68` é usada como cor principal do estado ativo.
 *  - A paleta de hover usa `#251846ff` para fundo escuro com texto branco.
 *  - Pode ser integrada em listas de avaliações, postagens ou produtos.
 *  - A11y: `Chip` já é um botão acessível, mas pode ser aprimorado com `aria-pressed`.
 *
 * Dependências:
 *  - @mui/material: Chip, Stack.
 *  - @mui/icons-material: ThumbUpOffAltIcon, ThumbDownOffAltIcon.

 */
import { Chip, Stack } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const LikeOrNot = ({
  isLike,
  isDislike,
  likesCount = 0,
  dislikesCount = 0,
  onClick,
}: {
  isLike: boolean;
  isDislike: boolean;
  likesCount?: number;
  dislikesCount?: number;
  onClick: (opt: "like" | "dislike") => void;
}) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <Chip
        icon={<ThumbUpOffAltIcon />}
        onClick={() => onClick("like")}
        label={likesCount}
        sx={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRight: "none",
          color: isLike ? "#fff" : "inherit",
          backgroundColor: isLike ? "#E01B68" : "none",
          "&:hover": {
            backgroundColor: isLike ? "#E01B68" : "#251846ff",
            color: "#fff",
          },
        }}
      />

      <Chip
        icon={<ThumbDownOffAltIcon />}
        onClick={() => onClick("dislike")}
        label={dislikesCount}
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          color: isDislike ? "#fff" : "inherit",
          backgroundColor: isDislike ? "#E01B68" : "none",
          "&:hover": {
            backgroundColor: isDislike ? "#E01B68" : "#251846ff",
            color: "#fff",
          },
        }}
      />
    </Stack>
  );
};

export default LikeOrNot;

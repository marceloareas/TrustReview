/**
 * ProductCard
 *
 * Propósito:
 *  Exibir um cartão representando um produto com imagem e nome.
 *  É utilizado em listas, galerias ou vitrines de produtos para navegação e seleção.
 *
 * Uso:
 *  <ProductCard productData={produto} onClick={() => navegarPara(produto.id)} />
 *
 * Entradas (props):
 *  - productData?: Partial<IProduct> — dados do produto a serem exibidos (nome, imagem, etc.).
 *    Pode ser parcial, pois nem todos os campos são obrigatórios.
 *  - onClick: () => void — função chamada ao clicar no cartão (ex.: abrir detalhes do produto).
 *
 * Comportamento:
 *  - Renderiza um `Card` do Material UI com tamanho fixo (236x236px) e bordas arredondadas.
 *  - O cartão é clicável e apresenta leve zoom ao passar o mouse (efeito hover com `transform: scale(1.02)`).
 *  - Mostra uma imagem (`CardMedia`):
 *      • Se o produto tiver `imageUrl`, exibe-a.
 *      • Caso contrário, usa uma imagem padrão (`CardImage`).
 *  - Mostra o nome do produto dentro de um `Tooltip` (para exibir o texto completo se estiver truncado).
 *  - O texto do nome é renderizado com `Typography` (`variant="h6"`, `noWrap`).
 *
 * Observações:
 *  - O `Tooltip` melhora a usabilidade quando o nome do produto é muito longo.
 *  - `CardMedia` está com `objectFit: "contain"` para manter a proporção da imagem.
 *  - Usa `Partial<IProduct>` para permitir renderização mesmo com dados incompletos.
 *  - A11y: o cartão poderia ter `aria-label` ou `role="button"` para maior acessibilidade.
 *
 * Dependências:
 *  - @mui/material: Card, CardContent, CardMedia, Tooltip, Typography.
 *  - assets: CardImage (imagem padrão de produto).
 *  - interfaces: IProduct (tipagem base do produto).
 */
import {
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import CardImage from "../../../assets/images/card-image.svg";
import type { IProduct } from "../../../interfaces/Product";

const ProductCard = ({
  productData,
  onClick,
}: {
  productData?: Partial<IProduct>;
  onClick: () => void;
}) => {
  return (
    <Card
      sx={{
        width: "236px",
        height: "236px",
        borderRadius: 4,
        backgroundColor: "#fff",
        cursor: "pointer",
        flexShrink: 0,
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
      onClick={onClick}
    >
      <CardMedia
        component={"img"}
        sx={{
          objectFit: "contain",
          width: "100%",
          height: "180px",
          p: 1,
        }}
        draggable={false}
        image={productData?.imageUrl || CardImage}
        title={productData?.name}
      />
      <CardContent
        sx={{
          textAlign: "flex-start",
          width: "100%",
          bgcolor: "background.cardContent",
        }}
      >
        <Tooltip title={productData?.name} arrow placement="top">
          <Typography variant="h6" noWrap>
            {productData?.name}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

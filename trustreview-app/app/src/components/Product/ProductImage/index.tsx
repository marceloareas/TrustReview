/**
 * ProductImage
 *
 * Propósito:
 *  Exibe a imagem de um produto em um card com dimensões fixas e bordas arredondadas.
 *  Usado para destacar visualmente um item individual, como parte de uma listagem
 *  ou detalhe de produto.
 *
 * Uso:
 *  <ProductImage name="Notebook Gamer" imageUrl="/imagens/notebook.png" />
 *
 * Entradas:
 *  - name?: string — nome do produto, usado como título (atributo `title` da imagem).
 *  - imageUrl?: string — URL da imagem do produto. Se não fornecida, é exibida
 *    uma imagem padrão (`CardImage`).
 *
 * Comportamento:
 *  - Renderiza um card com uma imagem centralizada e ajustada proporcionalmente (`objectFit: "contain"`).
 *  - Quando `imageUrl` é nula ou indefinida, usa a imagem padrão importada (`card-image.svg`).
 *  - A imagem não é arrastável (`draggable={false}`).
 *
 * Notas:
 *  - Depende de @mui/material (Card, CardMedia).
 *  - Ideal para uso junto com outros componentes como `ProductCard` ou em páginas
 *    de detalhes de produto.
 *  - A11y: o atributo `title` melhora a acessibilidade e fornece contexto ao usuário.
 */
import { Card, CardMedia } from "@mui/material";
import CardImage from "../../../assets/images/card-image.svg";

const ProductImage = ({
  name,
  imageUrl,
}: {
  name?: string;
  imageUrl?: string;
}) => {
  return (
    <Card
      sx={{
        width: "240px",
        height: "240px",
        borderRadius: 4,
        flex: 1,
      }}
    >
      <CardMedia
        component={"img"}
        sx={{
          objectFit: "contain",
          width: "100%",
          p: 2,
        }}
        draggable={false}
        // image={imageUrl || CardImage}
        image={CardImage}
        title={name}
      />
    </Card>
  );
};

export default ProductImage;

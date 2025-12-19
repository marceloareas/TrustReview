/**
 * ProductTitle
 *
 * Propósito:
 *  Exibe um título de seção de produtos com fundo decorativo.
 *  Ideal para destacar a seção de produtos em páginas de listagem ou catálogo.
 *
 * Uso:
 *  <ProductTitle />
 *
 * Entradas:
 *  - Nenhuma prop.
 *
 * Comportamento:
 *  - Renderiza um `Box` que serve como container relativo.
 *  - Exibe uma imagem de fundo (`titleBg`) usando `Box component="img"` com `objectFit: "cover"`.
 *  - Sobrepõe o título `Typography` sobre a imagem de fundo, posicionando-o no canto superior esquerdo.
 *  - O título é estilizado com `variant="h4"`, `fontWeight="bold"` e cor `primary.contrastText`.
 *  - A imagem de fundo possui leve transparência (`opacity: 0.9`) e altura fixa de 60px.
 *
 * Observações:
 *  - Dependências: @mui/material (Box, Typography), assets/images/titleBg.svg.
 *  - A combinação de imagem de fundo e título sobreposto cria destaque visual sem ocupar muito espaço.
 *  - A11y: atributo `alt` da imagem fornece contexto visual.
 */
import { Box, Typography } from "@mui/material";
import titleBg from "../../../assets/images/titleBg.svg";

const StylizedTitle = ({ title }: { title: string }) => {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        component="img"
        src={titleBg}
        alt="Product Title Background"
        sx={{
          position: "relative",
          objectFit: "cover",
          width: "100%",
          opacity: 0.9,
          height: 60,
        }}
      />
      <Typography
        variant="h4"
        sx={{
          position: "absolute",
          top: "8px",
          left: "16px",
          fontWeight: "bold",
          color: "primary.contrastText",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default StylizedTitle;

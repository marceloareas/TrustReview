/**
 * AppTitle
 *
 * Propósito:
 *  Exibir o título principal da aplicação ("TrustReview") com estilo tipográfico destacado.
 *  Usado geralmente na barra superior (AppBar) ou em layouts principais para identificar o sistema.
 *
 * Uso:
 *  <AppTitle /> — componente sem props; exibe apenas o nome da aplicação com estilização.
 *
 * Entradas:
 *  - Nenhuma prop.
 *
 * Comportamento:
 *  - Renderiza um componente `Typography` do Material UI com variante `h3`.
 *  - Aplica estilo personalizado (peso da fonte, posição e família tipográfica específica).
 *  - O título é fixo ("TrustReview") e não muda dinamicamente.
 *
 * Observações:
 *  - Usa a fonte `"Marko One", serif`, que deve estar carregada no projeto (via Google Fonts ou similar).
 *  - Pode ser facilmente ajustado para receber texto dinâmico via prop, caso desejado.
 *  - A11y: o `Typography` já é semântico, mas pode ser envolvido em um `<header>` se for usado como título principal.
 *
 * Dependências:
 *  - @mui/material: Typography.
 */
import { Typography } from "@mui/material";

const AppTitle = () => {
  return (
    <Typography
      variant="h3"
      sx={{
        top: "8px",
        left: "16px",
        fontWeight: "bold",
        fontFamily: '"Marko One", serif',
      }}
    >
      TrustReview
    </Typography>
  );
};

export default AppTitle;

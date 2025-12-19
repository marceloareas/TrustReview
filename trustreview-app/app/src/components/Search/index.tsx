/**
 * Search
 *
 * Propósito:
 *  Componente de campo de busca com ícones de pesquisa e limpar.
 *  Permite digitar um termo, submeter a busca ao pressionar Enter
 *  e limpar o campo com um botão.
 *
 * Uso:
 *  <Search
 *    value={searchTerm}
 *    onChange={(e) => setSearchTerm(e.target.value)}
 *    handleSearchSubmit={() => console.log("Buscando:", searchTerm)}
 *  />
 *
 * Entradas (props):
 *  - value: string — valor atual do campo de busca.
 *  - onChange: (event: React.ChangeEvent<HTMLInputElement>) => void — callback
 *    chamado a cada alteração no input.
 *  - handleSearchSubmit?: () => void — função opcional chamada ao pressionar
 *    Enter no input.
 *
 * Comportamento:
 *  - Renderiza um `TextField` do Material UI com `variant="outlined"`.
 *  - Inclui ícone de busca (`SearchIcon`) no início do input.
 *  - Se o campo tiver valor, exibe um botão de limpar (`Clear`) no final.
 *  - Pressionar Enter chama `handleSearchSubmit` se fornecida.
 *  - Clicar no botão limpar reseta o valor do input chamando `onChange` com string vazia.
 *
 * Observações:
 *  - A11y: o input possui `aria-label="search"` para leitores de tela.
 *  - Tamanho do ícone de limpar é reduzido (`fontSize: 16px`) para melhor alinhamento.
 *  - Ideal para formulários, filtros de listas ou pesquisas em dashboards.
 *
 * Dependências:
 *  - @mui/material: TextField, InputAdornment, IconButton
 *  - @mui/icons-material: Search, Clear
 */
import { Clear } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";

interface SearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit?: () => void;
}

const Search = ({ value, onChange, handleSearchSubmit }: SearchProps) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      onKeyDown={(e) => {
        if (e.key === "Enter" && handleSearchSubmit) {
          handleSearchSubmit();
        }
      }}
      variant="outlined"
      placeholder="Buscar"
      fullWidth
      size="medium"
      slotProps={{
        input: {
          "aria-label": "search",
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  onChange({
                    target: { value: "" },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                edge="end"
                size="small"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "16px",
                  },
                }}
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default Search;

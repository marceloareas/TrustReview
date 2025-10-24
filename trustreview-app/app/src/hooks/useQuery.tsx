/**
 * useQuery
 *
 * Propósito:
 *  Simplificar o acesso aos parâmetros de query da URL retornando uma
 *  instância de `URLSearchParams` baseada no `search` do `useLocation()`.
 *
 * Uso:
 *  const query = useQuery();
 *  const page = query.get('page');
 *
 * Observações / comportamento:
 *  - Retorna uma nova instância de `URLSearchParams` a cada render. Para
 *    listas grandes de parsing ou operações custosas, considere memoizar
 *    chamadas do chamador.
 *  - Em SSR `window.location` não está disponível, mas `useLocation()` do
 *    react-router-dom já abstrai isso; certifique-se de usar esse hook dentro
 *    de um Router.
 */

import { useLocation } from "react-router-dom";

export function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

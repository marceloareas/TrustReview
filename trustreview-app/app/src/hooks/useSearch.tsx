/**
 * useSearch
 *
 * Propósito:
 *  Hook genérico para filtrar uma lista de itens por um termo de busca
 *  aplicado a um conjunto de chaves do item.
 *
 * Assinatura:
 *  useSearch<T>(items: T[], keys: (keyof T)[], initialSearch?: string)
 *  -> { searchTerm, setSearchTerm, filteredItems }
 *
 * Comportamento:
 *  - `searchTerm` é mantido em estado e pode ser atualizado via `setSearchTerm`.
 *  - `filteredItems` é memoizado e contém os itens cujo valor em qualquer
 *    das `keys` contém (case-insensitive) o `searchTerm`.
 *  - Converte os valores das chaves para `String(...)` antes de comparar,
 *    portanto suporta números e outros tipos primitivos.
 *
 * Exemplo:
 *  const { searchTerm, setSearchTerm, filteredItems } = useSearch(products, ['title','brand']);
 *
 * Observação técnica:
 *  - Retorna `filteredItems` como um array novo quando o termo ou items mudam.
 */

import { useMemo, useState } from "react";

export function useSearch<T>(
  items: T[],
  keys: (keyof T)[],
  initialSearch?: string
) {
  const [searchTerm, setSearchTerm] = useState(initialSearch || "");

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      keys.some((key) =>
        String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [items, searchTerm, keys]);

  return { searchTerm, setSearchTerm, filteredItems };
}

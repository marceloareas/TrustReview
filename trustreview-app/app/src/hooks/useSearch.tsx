import { useMemo, useState } from "react";

export function useSearch<T>(
  items: T[],
  keys: (keyof T)[],
  initialSearch?: string,
) {
  const [searchTerm, setSearchTerm] = useState(initialSearch || "");

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      keys.some((key) =>
        String(item[key]).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [items, searchTerm, keys]);

  return { searchTerm, setSearchTerm, filteredItems };
}

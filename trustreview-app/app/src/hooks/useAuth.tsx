/**
 * useAuth
 *
 * Propósito:
 *  Hook de conveniência para acessar o `AuthContext`. Centraliza a lógica
 *  de obtenção do contexto e garante que o hook seja usado dentro de
 *  um `AuthProvider` válido.
 *
 * Uso:
 *  const { user, login, logout } = useAuth();
 *
 * Contrato / comportamento:
 *  - Lança um `Error` (fail-fast) se usado fora de um `AuthProvider`.
 *  - Retorna o objeto do contexto conforme `AuthContextProps` (user, login, logout, register, authorized).
 *
 * Recomendações:
 *  - Consumir somente dentro de componentes filhos de `AuthProvider`.
 *  - Tratar promessas de `login`/`register` com try/catch na camada que chama para apresentar erros amigáveis ao usuário.
 */

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de AuthProvider");
  }
  return context;
};

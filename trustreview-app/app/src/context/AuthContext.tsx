/**
 * AuthContext
 *
 * Propósito:
 *  Fornecer contexto de autenticação para a aplicação (user, login, logout,
 *  register, authorized) e persistir o usuário no localStorage.
 *
 * Uso:
 *  - Envolver a árvore de componentes com <AuthProvider>{children}</AuthProvider>
 *  - Consumir via `useContext(AuthContext)` para acessar `user`, `login`, etc.
 *
 * Entradas:
 *  - `children: React.ReactNode` (prop do provider).
 *
 * Contrato (valor do contexto):
 *  - user: IUser | null
 *  - login(email: string, password: string): Promise<void>
 *  - logout(): void
 *  - register(email: string, password: string): Promise<void>
 *  - authorized?: boolean
 *
 * Comportamento principal:
 *  - Persiste o usuário no `localStorage` ao fazer login/register e remove ao logout.
 *  - Restaura estado do usuário no mount lendo `localStorage`.
 *  - Atualiza `authorized` com base na presença de `user`.
 *
 **/

/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState, useCallback } from "react";
import { userService } from "../services";
import type { IUser, UserDTO } from "../interfaces/IUser";

interface AuthContextProps {
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  authorized?: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [authorized, setAuthorized] = useState<boolean>(false);

  const persistUser = (data: IUser | null) => {
    setUser(data);
    if (data) localStorage.setItem("user", JSON.stringify(data));
    else localStorage.removeItem("user");
    setAuthorized(!!data);
  };

  const register = useCallback(async (name: string, email: string, password: string) => {
    const response = await userService.createUser({
      name,
      email,
      password,
    } as UserDTO);
    const { id, name: userName, email: userEmail, userType } = response;
    persistUser({ id, name: userName, email: userEmail, userType });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await userService.login(email, password);
    const { id, name, email: userEmail, userType } = response;
    persistUser({ id, name, email: userEmail, userType });
  }, []);

  const logout = useCallback(() => {
    persistUser(null);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        persistUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, authorized }}>
      {children}
    </AuthContext.Provider>
  );
};

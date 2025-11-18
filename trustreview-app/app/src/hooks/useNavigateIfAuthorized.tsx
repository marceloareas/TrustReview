import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

/**
 * useNavigateIfAuthorized
 *
 * Exposes a navigateIfAuthorized(path) that uses the router's `useNavigate`
 * together with the `authorized` state from `AuthContext`.
 *
 * Use inside components (hooks may call other hooks). This keeps navigation
 * out of the context provider while keeping a small convenience helper.
 */
export const useNavigateIfAuthorized = () => {
  const { authorized } = useAuth();
  const navigate = useNavigate();

  const navigateIfAuthorized = useCallback(
    (path?: string) => {
      if (!authorized) {
        navigate("/login");
        return;
      }
      navigate(path || '');
    },
    [authorized, navigate],
  );

  return { navigateIfAuthorized };
};

export default useNavigateIfAuthorized;

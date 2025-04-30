import {jwtDecode} from "jwt-decode";

export default function useHasRole() {
  const hasRole = (role: string): boolean => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded: {
        realm_access?: {
          roles?: string[];
        };
      } = jwtDecode(token);

      return decoded.realm_access?.roles?.includes(role) || false;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return false;
    }
  };

  return { hasRole };
}
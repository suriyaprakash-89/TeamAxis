import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Custom hook for accessing auth context.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

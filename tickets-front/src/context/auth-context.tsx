"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../api/api";
import { decodeUserFromToken } from "../common/helpers";

interface IAuthContext {
  authState: AuthState;
  setAuthState: Dispatch<SetStateAction<AuthState>>;
  setTokensOnLogin: (token: string, refresh_token: string) => void;
  refreshToken: (failedReq?: any) => Promise<any>;
  clearTokensOnLogout: () => Promise<void>;
}

interface AuthState {
  accessToken?: string;
  refreshToken?: string;
  email?: string;
  id?: string;
  roleId?: number;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    refreshToken: Cookies.get("refreshToken"),
    accessToken: Cookies.get("accessToken"),
  });

  const setTokensOnLogin = (accessToken: string, refreshToken: string) => {
    const { email, id, roleId } = decodeUserFromToken(accessToken);

    setAuthState({ accessToken, refreshToken, email, id, roleId });

    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
  };

  const refreshToken = async (failedReq?: any) => {
    try {
      if (!authState) {
        return;
      }

      const response = await axios.get(`${BASE_URL}auth/refresh`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("refreshToken")}`,
        },
      });

      const { accessToken, refreshToken } = response.data;

      const userData = decodeUserFromToken(accessToken);

      const newCredentials: AuthState = {
        accessToken,
        refreshToken,
        email: userData.email,
        id: userData.id,
        roleId: userData.roleId,
      };

      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);

      setAuthState(newCredentials);

      if (failedReq) {
        failedReq.response.config.headers["Authorization"] =
          "Bearer " + accessToken;
      }
      Promise.resolve();
    } catch (error: any) {
      console.error("Token refresh failed", error);
      window.location.href = "";
    }
  };

  const clearTokensOnLogout = useCallback(async () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setAuthState({
      accessToken: undefined,
      refreshToken: undefined,
      email: "",
      id: "",
      roleId: undefined,
    });
  }, [authState]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        setTokensOnLogin,
        clearTokensOnLogout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

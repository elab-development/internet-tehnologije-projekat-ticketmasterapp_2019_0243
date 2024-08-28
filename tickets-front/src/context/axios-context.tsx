"use client";
import { createContext } from "react";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { useAuthContext } from "./auth-context";
import { axiosInstance } from "../api/api";

const AxiosContext = createContext({});

const { Provider } = AxiosContext;

const AxiosProvider = ({ children }: any) => {
  const { authState, refreshToken } = useAuthContext();

  axiosInstance.interceptors.request.use(
    (config: any) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] =
          config.url === `${process.env.NEXT_PUBLIC_BASE_URL}auth/refresh`
            ? `Bearer ${authState.refreshToken}`
            : `Bearer ${authState.accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  createAuthRefreshInterceptor(axiosInstance, refreshToken, {
    statusCodes: [401],
  });
  return (
    <Provider value={{ axiosInstance: axiosInstance }}>{children}</Provider>
  );
};

export { AxiosContext, AxiosProvider };

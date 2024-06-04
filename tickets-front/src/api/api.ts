import axios, { AxiosError } from "axios";

type HttpMethod = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

export enum RestCodes {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  Conflict = 409,
}

export const BASE_URL = "http://localhost:3000/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export function postRequest<T = any>(
  path: string,
  data: Record<string, any>
): Promise<T> {
  return makeRequest("POST", path, data);
}

export function putRequest<T = any>(
  path: string,
  data: Record<string, any>
): Promise<T> {
  return makeRequest("PUT", path, data);
}

export function patchRequest<T = any>(
  path: string,
  data: Record<string, any>
): Promise<T> {
  return makeRequest("PATCH", path, data);
}

export function deleteRequest<T = any>(
  path: string,
  data?: Record<string, any>
): Promise<T> {
  return makeRequest("DELETE", path, data);
}

export function getRequest<T = any>(path: string): Promise<T> {
  return makeRequest("GET", path);
}

export async function makeRequest(
  method: HttpMethod,
  path?: string,
  data?: Record<string, any>
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json, */*",
  };

  const requestInit: RequestInit = {
    method,
    headers,
  };

  if (data) {
    requestInit.body = JSON.stringify(data);
  }

  const url = `${BASE_URL}${path}`;

  const response = await axiosInstance.request<any>({
    method,
    url,
    data,
  });

  if (response.status >= RestCodes.BadRequest) {
    throw AxiosError;
  }

  if (method === "DELETE") {
    return response;
  }

  return response.data;
}

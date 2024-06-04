import { getRequest } from "./api";

export function getAllUsers(queryParams?: string) {
  return getRequest(`users`);
}

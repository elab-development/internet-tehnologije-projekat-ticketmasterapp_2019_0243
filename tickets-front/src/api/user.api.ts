import { getRequest, postRequest } from "./api";

export function getAllUsers(queryParams?: string) {
  return getRequest(`users`);
}

export function createOrUpdateUser(data: any) {
  return postRequest(`users`, data);
}

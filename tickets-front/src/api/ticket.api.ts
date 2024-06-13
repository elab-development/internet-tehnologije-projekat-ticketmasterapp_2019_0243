import { postRequest } from "./api";

export function createOrUpdateTicket(data: any) {
  return postRequest(`ticket`, data);
}

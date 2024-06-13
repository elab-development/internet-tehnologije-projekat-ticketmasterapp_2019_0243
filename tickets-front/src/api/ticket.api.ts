import { getRequest, postRequest } from "./api";

export function createOrUpdateTicket(data: any) {
  return postRequest(`ticket`, data);
}

export function getTicketsForUser(userId: number) {
  return getRequest(`ticket/${userId}`);
}

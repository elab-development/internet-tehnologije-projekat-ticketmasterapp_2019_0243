import { getRequest, postRequest } from "./api";

export function getAllEvents(queryParams?: string) {
  return getRequest(`events`);
}

export function createOrUpdateEvent(data: any) {
  return postRequest(`events`, data);
}

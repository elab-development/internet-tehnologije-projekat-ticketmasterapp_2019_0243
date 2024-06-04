import { getRequest } from "./api";

export function getAllEvents(queryParams?: string) {
  return getRequest(`events`);
}

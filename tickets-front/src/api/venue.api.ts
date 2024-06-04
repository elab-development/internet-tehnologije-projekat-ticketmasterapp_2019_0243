import { getRequest, postRequest, deleteRequest } from "./api";

export function getAllVenues(queryParams?: string) {
  return getRequest(`place`);
}

export function getVenueDetails(venueId: number) {
  return getRequest(``);
}

export function createOrUpdateVenue(data: any) {
  return postRequest(``, data);
}

export function deleteVenue(venueId: number): Promise<void> {
  return deleteRequest(``);
}

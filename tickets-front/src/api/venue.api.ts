import { getRequest, postRequest, deleteRequest, patchRequest } from "./api";

export function getAllVenues(queryParams?: string) {
  return getRequest(`place`);
}

export function getVenueDetails(venueId: number) {
  return getRequest(``);
}

export function createVenue(data: any) {
  return postRequest(`place`, data);
}

export function updateVenue(data: any) {
  return patchRequest(`place`, data);
}

export function deleteVenue(venueId: number): Promise<void> {
  return deleteRequest(``);
}

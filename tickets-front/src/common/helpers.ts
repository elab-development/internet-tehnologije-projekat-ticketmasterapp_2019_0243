import { jwtDecode } from "jwt-decode";

export const decodeUserFromToken = (token: string): any => {
  try {
    const decodedToken: any = jwtDecode(token);
    return decodedToken || null;
  } catch (error) {
    console.error("Error decoding user from token", error);
    return undefined;
  }
};

export const trimDate = (date: any) => {
  return date.slice(0, 10);
};

import { RoleNameEnum } from "./common.enums";

export interface IEvent {
  id: number;
  name: string;
  description: string;
  date: string;
  priceInEur: number;
  place: any;
}

export interface IVenue {
  id: number;
  name: string;
  city: string;
  country: string;
}

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  surname: string;
  role: { id: number; name: string };
}

export interface ITicket {
  id: number;
  type: string;
  user: { name: string; surname: string };
  event: { name: string; date: string };
}

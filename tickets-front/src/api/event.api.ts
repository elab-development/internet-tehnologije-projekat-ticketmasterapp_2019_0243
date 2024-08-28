import axios from "axios";
import { getRequest, postRequest } from "./api";

const exchangeKey = process.env.REACT_APP_EXCHANGE_RATE_KEY;

export function getAllEvents(queryParams?: string) {
  return getRequest(`events`);
}

export function createOrUpdateEvent(data: any) {
  return postRequest(`events`, data);
}

export function getExchangeRate() {
  return axios.get(
    `https://v6.exchangerate-api.com/v6/${exchangeKey}/latest/EUR`
  );
}

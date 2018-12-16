import http from "./httpService";
import { apiUrl } from "../config/config";

const apiEndpoint = apiUrl + "/genres";
export function getGenres() {
  return http.get(apiEndpoint);
}

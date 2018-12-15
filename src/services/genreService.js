import axios from "axios";

const apiEndpoint = "http://localhost:3900/api/genres";
export function getGenres() {
  return axios.get(apiEndpoint);
}

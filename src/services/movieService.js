import axios from "axios";

const apiEndpoint = "http://localhost:3900/api/movies";
export function getMovies() {
  return axios.get(apiEndpoint);
}

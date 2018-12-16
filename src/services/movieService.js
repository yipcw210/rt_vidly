import http from "./httpService";
import { apiUrl } from "../config/config";

const apiEndpoint = apiUrl + "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(apiEndpoint + "/" + movieId);
}

export function deleteMovies(movieId) {
  return http.delete(apiEndpoint + "/" + movieId);
}
export function saveMovie(movieId, movie) {
  return http.put(apiEndpoint + "/" + movieId, movie);
}

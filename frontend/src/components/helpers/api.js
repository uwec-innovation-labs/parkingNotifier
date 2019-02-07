import axios from "axios";

const api = axios.create({
  baseURL: "https://api.parkingnotifier.com",
  headers: {
    post: {
      "Content-Type": "application/json"
    }
  }
});

export function getAPI() {
  return api;
}

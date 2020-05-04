import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/email/";

export function sendEmail(email) {
  return fetch(baseUrl, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(email),
  })
    .then(handleResponse)
    .catch(handleError);
}

import { handleResponse, handleError } from "./apiUtils";
// import hash from "./hash";

export function getToken() {
  const authEndpoint = "https://accounts.spotify.com/authorize"; // make this env variable after testing
  const clientId = "a55de65e5c654a47b60506f9f093cc60";
  const redirectUri = "http://localhost:3000/sinesthesia";
  const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-recently-played",
  ];

  //   if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;
  //   } else {

  //   }
}

export function getCurrentlyPlaying(token) {
  console.log("getting data with token " + token);
  //   fetch("https://api.spotify.com/v1/me/top/artists", {
  return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getLastPlayed(token) {
  console.log("getting last played");
  //   fetch("https://api.spotify.com/v1/me/top/artists", {
  return fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getTrackFeatures(token, id) {
  console.log("getting features with id " + id);
  //   fetch("https://api.spotify.com/v1/me/top/artists", {
  return fetch("https://api.spotify.com/v1/audio-features/" + id, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  })
    .then(handleResponse)
    .catch(handleError);
}

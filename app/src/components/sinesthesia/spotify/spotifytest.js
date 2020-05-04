import React from "react";
import { SpotifyApiContext, Artist } from "react-spotify-api";

const SpotifyTest = (props) => {
  return (
    <SpotifyApiContext.Provider value={props.token}>
      <Artist id={props.id}>
        {({ data, loading, error }) =>
          data ? (
            <div>
              <h1>{data.name}</h1>
              <ul>
                {data.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          ) : null
        }
      </Artist>
    </SpotifyApiContext.Provider>
  );
};

export default SpotifyTest;

import React, { useState, useEffect } from "react";

const CLIENT_ID = "16007201c81a4da79959ad58b8c47b49";
const CLIENT_SECRET = "cb79de79bbbf4dc9a7389b8e0d032cda";

function App() {
  const [artistVal, setArtistVal] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [artistId, setArtistId] = useState("");

  // this creates the token we need to authenticate ourselves to be able to use the Spotify API
  useEffect(() => {
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

// this call's the Spotify API and it will give us the specific artist id we need to make additional api calls
  async function search() {
    const artistParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${artistVal}&type=artist`,
      artistParameters
    );
    const data = await response.json();

    setArtistId(data.artists.items[0].id);
  }

// when user submits the what artist they want, the each time they change any value it changes the value of what that input box is 
  const change = (event) => {
    setArtistVal(event.target.value);
  };

  // we are returning the input box and the button, and displaying the value of the APi call
  return (
    <div>
      <input onChange={change} value={artistVal} />
      <button onClick={search}>Search</button>
      {artistId && <h1>Artist ID: {artistId}</h1>}
    </div>
  );
}

export default App;

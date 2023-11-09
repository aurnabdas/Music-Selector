import React, { useState, useEffect } from "react";

const CLIENT_ID = "16007201c81a4da79959ad58b8c47b49";
const CLIENT_SECRET = "cb79de79bbbf4dc9a7389b8e0d032cda";

function App() {
  const [artistVal, setArtistVal] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [artistId, setArtistId] = useState("");
  const [relatedArists, setRelatedArtists] = useState([]);
  const [artistAlbum, setArtistAlbum] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Authentication effect
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

  // Search function
  async function search() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${artistVal}&type=artist`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();

      if (data.artists.items.length > 0) {
        setArtistId(data.artists.items[0].id);
        setError(null);
      } else {
        setError("No artist found");
      }
    } catch (error) {
      setError("Error searching for the artist");
    } finally {
      setLoading(false);
    }
  }

  // Get related artists function
  async function getRelatedArtists() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setRelatedArtists(data.artists);
    } catch (error) {
      setError("Error fetching related artists");
    } finally {
      setLoading(false);
    }
  }

  // Get artist albums function
  async function getAlbum() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/albums`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();

      const albums = data.items.map((item) => item.name);
      setArtistAlbum(albums);
      setError(null);
    } catch (error) {
      setError("Error fetching artist albums");
    } finally {
      setLoading(false);
    }
  }

  // Input change handler
  const change = (event) => {
    setArtistVal(event.target.value);
  };

  return (
    <div>
      <input onChange={change} value={artistVal} />
      <button onClick={search}>Search</button>
      {artistId && <h1>Artist ID: {artistId}</h1>}
      {artistId && <button onClick={getRelatedArtists}>Get Related Artists</button>}
      {relatedArists.length > 0 && (
        <div>
          <h2>Related Artists:</h2>
          <ul>
            {relatedArists.map((artist) => (
              <li key={artist.id}>{artist.name}</li>
            ))}
          </ul>
        </div>
      )}
      {artistId && <button onClick={getAlbum}>Get Artists albums</button>}
      {artistAlbum.length > 0 && (
        <div>
          <h2>Artist Albums:</h2>
          <ul>
            {artistAlbum.map((album, index) => (
              <li key={index}>{album}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

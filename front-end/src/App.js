import React, { useState, useEffect } from "react";

const CLIENT_ID = "16007201c81a4da79959ad58b8c47b49";
const CLIENT_SECRET = "cb79de79bbbf4dc9a7389b8e0d032cda";

function App() {
  const [artistVal, setArtistVal] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [artistId, setArtistId] = useState("");
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  // Fetch access token on component mount
  useEffect(() => {
    const fetchAccessToken = async () => {
      const authParameters = new URLSearchParams();
      authParameters.append("grant_type", "client_credentials");

      const authResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
        body: authParameters,
      });

      if (authResponse.ok) {
        const authData = await authResponse.json();
        setAccessToken(authData.access_token);
      }
    };

    fetchAccessToken();
  }, []);

  // Function to search for the artist
  async function search() {
    try {
      const artistResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${artistVal}&type=artist`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      if (artistResponse.ok) {
        const artistData = await artistResponse.json();
        const firstArtist = artistData.artists.items[0];

        if (firstArtist) {
          setArtistId(firstArtist.id);
        }
      }
    } catch (error) {
      console.error("Error searching for artist:", error);
    }
  }

  // Function to get related artists based on the current artist id
  async function getRelatedArtists() {
    try {
      const relatedArtistsResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      if (relatedArtistsResponse.ok) {
        const relatedArtistsData = await relatedArtistsResponse.json();
        setRelatedArtists(relatedArtistsData.artists);
      }
    } catch (error) {
      console.error("Error fetching related artists:", error);
    }
  }

  // Function to get top tracks based on the current artist id
  async function getTopTracks() {
    try {
      const topTracksResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      if (topTracksResponse.ok) {
        const topTracksData = await topTracksResponse.json();
        setTopTracks(topTracksData.tracks);
      }
    } catch (error) {
      console.error("Error fetching top tracks:", error);
    }
  }

  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    setArtistVal(event.target.value);
  };

  return (
    <div>
      <h1>Spotify Artist Search</h1>
      <p>Enter your favorite artist and explore their related artists and top tracks.</p>

      <input onChange={handleInputChange} value={artistVal} placeholder="Enter artist name" />
      <button onClick={search}>Search</button>

      {artistId && <h2>Artist ID: {artistId}</h2>}

      {artistId && <button onClick={getRelatedArtists}>Get Related Artists</button>}
      {relatedArtists.length > 0 && (
        <div>
          <h2>Related Artists:</h2>
          <ul>
            {relatedArtists.map((artist) => (
              <li key={artist.id}>{artist.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        {artistId && <button onClick={getTopTracks}>Get Top Tracks</button>}
        {topTracks.length > 0 && (
          <div>
            <h2>Top Tracks:</h2>
            <ul>
              {topTracks.map((track) => (
                <li key={track.id}>{track.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

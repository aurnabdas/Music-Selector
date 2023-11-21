import React, { useState, useEffect } from "react";
import {Link, Route, Routes} from "react-router-dom"
import Albumns from "./Albums";
import TopTracks from "./TopTracks";
import RelatedArtist from "./RelatedArtist";



const CLIENT_ID = "16007201c81a4da79959ad58b8c47b49";
const CLIENT_SECRET = "cb79de79bbbf4dc9a7389b8e0d032cda";

function App() {
  const [artistVal, setArtistVal] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [artistId, setArtistId] = useState("");
  

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


  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    setArtistVal(event.target.value);
  };

 
  return (
    <>

    <nav>
      <Link to="/Music-Selector/RelatedArtist" activeClassName="active-link">Related Artists</Link>
      <Link to="/Music-Selector/Albums" activeClassName="active-link">Albums</Link>  
      <Link to="/Music-Selector/Albums/TopTracks" activeClassName="active-link">Top Tracks</Link>

    </nav>
     
     <div className="container">
      <h1>Spotify Artist Search</h1>
      <p>Enter your favorite artist and explore their related artists and top tracks.</p>

      <input onChange={handleInputChange} value={artistVal} placeholder="Enter artist name" />
      <button onClick={search}>Search</button>
      {artistId && <h2>Artist ID: {artistId}</h2>}

      

      {/* <RelatedArtist artist={artistId} access={accessToken}/>
     <TopTracks artist={artistId} access={accessToken}/>
     <Albumns artist={artistId} access={accessToken}/> */}

      <Routes>
        {/* <Route path="/Music-Selector" element={artistId && <h2>Artist ID: {artistId}</h2>}/> */}
        <Route path="/Music-Selector/RelatedArtist" element={<RelatedArtist artist={artistId} access={accessToken}/>
      } 
        />

        <Route path="/Music-Selector/Albums" >
          <Route index element={<Albumns artist={artistId} access={accessToken} />}/>
          <Route path="TopTracks" element={<TopTracks artist={artistId} access={accessToken}/>}/>
        </Route>
      </Routes>

    </div>

    </>
  );
}

export default App;

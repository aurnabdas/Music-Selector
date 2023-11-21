import { useEffect, useState } from "react";

function TopTracks({artist, access}){

  const [topTracks, setTopTracks] = useState([]);
  
  // Function to get top tracks based on the current artist id
  async function getTopTracks() {
    try {
      const topTracksResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artist}/top-tracks?country=US`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${access}`,
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

return(
<>

{artist && <button onClick={getTopTracks}>Get Top Tracks</button>}
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



</>
)}



export default TopTracks;
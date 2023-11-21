import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setArtistId, setAccessToken, setTopTracks } from './actions';


function TopTracks(){

const dispatch = useDispatch();
const topTracks = useSelector(state => state.topTracks); 
const artistId = useSelector(state => state.artistId); 
const accessToken = useSelector(state => state.accessToken);
  
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
        dispatch(setTopTracks(topTracksData.tracks));
      }
    } catch (error) {
      console.error("Error fetching top tracks:", error);
    }
  }

return(
<>

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



</>
)}



export default TopTracks;
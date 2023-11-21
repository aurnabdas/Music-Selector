import { useEffect, useState } from "react";
import {Link, Route, Routes} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { setArtistId, setAccessToken, setRelatedArtists } from './actions'; 

 

function RelatedArtist({artist, access}){

const dispatch = useDispatch();
const relatedArtists = useSelector(state => state.relatedArtists); 
const artistId = useSelector(state => state.artistId); 
const accessToken = useSelector(state => state.accessToken);

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
        dispatch(setRelatedArtists(relatedArtistsData.artists));
      }
    } catch (error) {
      console.error("Error fetching related artists:", error);
    }
  }

return(
<>
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
   
</>

)}

export default RelatedArtist;
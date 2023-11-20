import { useEffect, useState } from "react";
import {Link, Route, Routes} from "react-router-dom"
 

function RelatedArtist({artist, access}){

const [relatedArtists, setRelatedArtists] = useState([]);

  // Function to get related artists based on the current artist id
  async function getRelatedArtists() {
    try {
      const relatedArtistsResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artist}/related-artists`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${access}`,
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

return(
<>
{artist && <button onClick={getRelatedArtists}>Get Related Artists</button>}
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
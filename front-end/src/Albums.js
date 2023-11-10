import { useEffect, useState } from "react";

function Albumns({artist, access}){

const [artistAlbum, setArtistAlbum] = useState([]);
const [loading,setLoading] = useState(false);
const [error,setError] = useState(null);

    async function getAlbum() {
        try {
          setLoading(true);
            const response = await fetch(
            `https://api.spotify.com/v1/artists/${artist}/albums`,
            {
              method: "GET",
              headers: {
             "Content-Type": "application/json",
              Authorization: `Bearer ${access}`,
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


return(
<>

{artist && <button onClick={getAlbum}>Get Artists albums</button>}
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
</>
)}

export default Albumns;



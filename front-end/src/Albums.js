import { useEffect, useState } from "react";
import {Link, Route, Routes} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { setArtistId, setAccessToken, setAlbums } from './actions'; 




function Albumns(){
  const dispatch = useDispatch();
  const artistAlbum = useSelector(state => state.artistAlbum); 
  const artistId = useSelector(state => state.artistId); 
  const accessToken = useSelector(state => state.accessToken);



    async function getAlbum() {
        try {
          
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
          
          dispatch(setAlbums(albums));
          
          
        } catch (error) {
          console.log("Error fetching artist albums");
        } 
        
      }


return(
<>
<nav>
        <Link to="/Music-Selector/Search/RelatedArtist" activeClassName="active-link">Related Artists</Link>
        <Link to="/Music-Selector/Search/Albums" activeClassName="active-link">Albums</Link>
        <Link to="/Music-Selector/Search/TopTracks" activeClassName="active-link">Top Tracks</Link>
      </nav>
   
     
  
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
</>
)}

export default Albumns;



import React, { useState, useEffect } from "react";
import {Link, Route, Routes} from "react-router-dom"
import Albumns from "./Albums";
import TopTracks from "./TopTracks";
import RelatedArtist from "./RelatedArtist";
import { useDispatch, useSelector } from 'react-redux';
import { setArtistId, setAccessToken, setPicture } from './actions'; 
import Error from "./Error"
import Home from "./Home";
import Search from "./Search";



const CLIENT_ID = "16007201c81a4da79959ad58b8c47b49";
const CLIENT_SECRET = "cb79de79bbbf4dc9a7389b8e0d032cda";

function App() {

  const [artistVal, setArtistVal] = useState("");
      const dispatch = useDispatch();
      const artistId = useSelector(state => state.artistId); 
      const accessToken = useSelector(state => state.accessToken);
      const picture = useSelector(state => state.picture);
    

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
              dispatch(setAccessToken(authData.access_token));
            }
          };
      
          fetchAccessToken();
        }, []);
 


 
  return (
    <>

    
      

      

      {/* <RelatedArtist artist={artistId} access={accessToken}/>
     <TopTracks artist={artistId} access={accessToken}/>
     <Albumns artist={artistId} access={accessToken}/> */}

      <Routes>
        <Route path="/Music-Selector/" element={<Home />} />
          
        <Route path="/Music-Selector/Search" >
          <Route index element={<Search/>}/>
          <Route path="/Music-Selector/Search/RelatedArtist" element={<RelatedArtist/>} />
          <Route path="/Music-Selector/Search/Albums" element={<Albumns/>} />
          <Route path="/Music-Selector/Search/TopTracks" element={<TopTracks/>} />

        </Route>

        <Route path="*" element={<Error />} />

      </Routes>




    </>
  );
}

export default App;

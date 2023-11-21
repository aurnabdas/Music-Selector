import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setArtistId, setAccessToken, setPicture } from './actions';

const Search = () => {
  const [artistVal, setArtistVal] = useState("");
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.accessToken);
  const picture = useSelector(state => state.picture);

  const search = async () => {
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
        const image = artistData.artists.items[0].images[0].url;
        dispatch(setPicture(image));
        dispatch(setArtistId(firstArtist.id));
      }
    } catch (error) {
      console.error("Error searching for artist:", error);
    }
  };

  const handleInputChange = (event) => {
    setArtistVal(event.target.value);
  };

  return (
    <>
      <nav>
      <Link to="/Music-Selector/" activeClassName="active-link">Home</Link>
        <Link to="/Music-Selector/Search/RelatedArtist" activeClassName="active-link">Related Artists</Link>
        <Link to="/Music-Selector/Search/Albums" activeClassName="active-link">Albums</Link>
        <Link to="/Music-Selector/Search/TopTracks" activeClassName="active-link">Top Tracks</Link>
      </nav>

      <div className="container">
        <h1>Spotify Artist Search</h1>
        <p>Enter your favorite artist and explore their related artists and top tracks.</p>

        <input onChange={handleInputChange} value={artistVal} placeholder="Enter artist name" />
        <button onClick={search}>Search</button>
        {picture && <h2> {<img src={picture} style={{ width: '200px', height: 'auto' }} />}</h2>}
      </div>
    </>
  );
};

export default Search;

// RelatedArtist.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setRelatedArtists } from './actions';
import './RelatedArtist.css';

function RelatedArtist() {
  const dispatch = useDispatch();
  const artistId = useSelector(state => state.artistId); 
  const accessToken = useSelector(state => state.accessToken);
  const relatedArtists = useSelector(state => state.relatedArtists);

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

  return (
    <>
      <nav>
        <Link to="/Music-Selector/" activeClassName="active-link">Home</Link>
        <Link to="/Music-Selector/Search/RelatedArtist" activeClassName="active-link">Related Artists</Link>
        <Link to="/Music-Selector/Search/Albums" activeClassName="active-link">Albums</Link>
        <Link to="/Music-Selector/Search/TopTracks" activeClassName="active-link">Top Tracks</Link>
      </nav>
      {artistId && accessToken && (
        <button onClick={getRelatedArtists} className="get-related-artists-button">Get Related Artists</button>
      )}
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
  );
}

export default RelatedArtist;

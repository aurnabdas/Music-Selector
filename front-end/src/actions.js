export const setArtistId = (id) => {
    return {
      type: 'SET_ARTIST_ID',
      payload: id,
    };
  };
  
  export const setAccessToken = (token) => {
    return {
      type: 'SET_ACCESS_TOKEN',
      payload: token,
    };
  };
  
  export const setPicture = (url) => {
    return {
      type: 'SET_PICTURE',
      payload: url,
    };
  };
  
  
  export const setAlbums = (array) => {
    return {
      type: 'SET_ALBUMS',
      payload: array,
    };
  };

  export const setRelatedArtists = (array) => {
    return {
      type: 'SET_RELATED_ARTISTS',
      payload: array,
    };
  }

  export const setTopTracks = (array) => {
    return {
      type: 'SET_TOP_TRACKS',
      payload: array,
    };
  }


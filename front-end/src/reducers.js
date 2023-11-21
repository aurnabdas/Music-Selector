const initialState = {
    artistId: '',
    accessToken: '',
    picture: '',
    artistAlbum: [],
    relatedArtists: [],
    topTracks: []

  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_ARTIST_ID':
        return { ...state, artistId: action.payload };
      case 'SET_ACCESS_TOKEN':
        return { ...state, accessToken: action.payload };

    case 'SET_PICTURE':
        return { ...state, picture: action.payload };
    case 'SET_ALBUMS':
        return { ...state, artistAlbum: action.payload };
    case 'SET_RELATED_ARTISTS':
        return { ...state, relatedArtists: action.payload };
    case 'SET_TOP_TRACKS':
        return { ...state, topTracks: action.payload };


      default:
        return state;
    }
  }
  
  export default rootReducer;
# Music-Selector

# Project README

This repository contains a React application that utilizes the Spotify API to search for artists, retrieve related artists, top tracks, and artist albums. The code snippet in the provided file showcases the implementation of these functionalities.

## APIs Used in the Project

### Related Artists
- **API Provider:** Spotify
- **API Endpoint:** `GET /artists/{id}/related-artists`
- **Screenshot of Successful Postman Test:** [Link to Postman Screenshot](relatedArtistPostman.png) *(To be replaced with actual screenshot)*
- **API Documentation:** [Spotify API - Get an Artist's Related Artists](https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-an-artists-related-artists)
- **Description:** This API is used to retrieve a list of related artists based on the currently selected artist.

### Search Artist
- **API Provider:** Spotify
- **API Endpoint:** `GET /search?q={artistName}&type=artist`
- **Screenshot of Successful Postman Test:** [Link to Postman Screenshot](searchPostman.png) *(To be replaced with actual screenshot)*
- **API Documentation:** [Spotify API - Search for an Artist](https://developer.spotify.com/documentation/web-api/reference/#category-search)
- **Description:** This API is used to search for a specific artist using the artist's name.

### Get Top Tracks
- **API Provider:** Spotify
- **API Endpoint:** `GET /artists/{id}/top-tracks?country=US`
- **Screenshot of Successful Postman Test:** [Link to Postman Screenshot](topTrackPostman.png) *(To be replaced with actual screenshot)*
- **API Documentation:** [Spotify API - Get an Artist's Top Tracks](https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-an-artists-top-tracks)
- **Description:** This API fetches the top tracks of the selected artist.

### Top Album
- **API Provider:** Spotify
- **API Endpoint:** `GET /artists/{id}/albums`
- **Screenshot of Successful Postman Test:** [Link to Postman Screenshot](albumsPostman.png) *(To be replaced with actual screenshot)*
- **API Documentation:** [Spotify API - Get an Artist's Albums](https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-an-artists-albums)
- **Description:** This API is used to retrieve albums of the selected artist.

## Contributors and Responsibilities

- Related Artists: Worked on by Mahathir
- Search Artist: Worked on by Aurnab
- Get Top Tracks: Worked on by Abir
- Top Album, Loading, and Error: Worked on by Muhammed

The team members mentioned above were responsible for developing and implementing the respective API functionalities as described.

For any questions or issues, feel free to contact the contributors mentioned above.
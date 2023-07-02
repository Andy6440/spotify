import axios from "axios";
import { SpotifyArtist, SpotifyTrack, TopTrack, Track } from "../types";

function getData(endpoint: string) {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      }
    })
      .then(response => {
        if (!response.status) {
          throw new Error('Network response was not ok');
        }
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

async function getTopTracks() {
  const endpoint = 'v1/me/top/tracks?time_range=short_term&limit=5';
  return await getData(endpoint);
}

export const getAll = () => {
  return getTopTracks().then((respose: unknown) => {
    const topTrackData = respose as TopTrack;
    return topTrackData.items.map((item: SpotifyTrack) => {
      return {
        albumName: item.album.name,
        albumReleaseDate: item.album.release_date,
        artists: item.artists.map((artist: SpotifyArtist) => {
          return {
            name: artist.name,
            spotifyUrl: artist.external_urls.spotify
          };
        }),
        trackName: item.name,
        trackUrl: item.external_urls.spotify
      } as Track
    })
  }).catch(error => {
    throw new Error(error);
  })
};

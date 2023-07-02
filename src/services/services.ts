
import { SpotifyTrack, Track, SpotifyArtist } from "../types";

async function fetchWebApi(endpoint: string, method: string) {

  try {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      method,
    });
    return await res.json();
  } catch (error) {
    console.error('Error parsing response body:', error);
  }
}


async function getTopTracks() {
  const endpoint = 'v1/me/top/tracks?time_range=short_term&limit=5';
  const method = 'GET';
  return await fetchWebApi(endpoint, method);
}

export const getAll = async () => {
  const topTracks = await getTopTracks();

  return topTracks.items.map((item: SpotifyTrack) => {
    const data: Track = {
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
    }
    return data;
  });
};

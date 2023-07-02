import { SpotifyArtist, SpotifyTrack, TopTrack, Track } from "../types";

function fetchWebApi(endpoint: string, method: string) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      method,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {

        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function getTopTracks() {
  const endpoint = 'v1/me/top/tracks?time_range=short_term&limit=5';
  const method = 'GET';
  return await fetchWebApi(endpoint, method);
}

export const getAll = async () => {
  const data: TopTrack = await getTopTracks() as TopTrack
  return data.items.map((item: SpotifyTrack) => {
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

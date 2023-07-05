// import { SpotifyArtist, SpotifyTrack, TopTrack, Track } from "../interfaces/spotify";
import { getData } from './auth' 

 

async function getTopTracks() {
    const endpoint = 'v1/me/top/tracks?time_range=short_term&limit=5'
    const token =await getData(endpoint)
    console.log('llefa el token',token)
    return token
}

export const getAll = async () => {
    return await getTopTracks()
    // .then((respose: unknown) => {
    //   const topTrackData = respose as TopTrack;
    //   return topTrackData.items.map((item: SpotifyTrack) => {
    //     return {
    //       albumName: item.album.name,
    //       albumReleaseDate: item.album.release_date,
    //       artists: item.artists.map((artist: SpotifyArtist) => {
    //         return {
    //           name: artist.name,
    //           spotifyUrl: artist.external_urls.spotify
    //         };
    //       }),
    //       trackName: item.name,
    //       trackUrl: item.external_urls.spotify
    //     } as Track
    //   })
    // }).catch(error => {
    //   throw new Error(error);
    // })
}

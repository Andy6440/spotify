// import { SpotifyArtist, SpotifyTrack, TopTrack, Track } from "../interfaces/spotify";
// import axios from 'axios'
import jwt from 'jsonwebtoken'
// import { getAccessToken } from './auth'
// import axios from 'axios'

 

export const getAll = async () => {
    // const endpoint = 'v1/me/top/tracks?time_range=short_term&limit=5'
    const secret = process.env.JTW_PASSWORD

    if (!secret) {
        throw new Error('SECRET is not defined')
    }
    const jwttoken = process.env.TOKEN

    if (!jwttoken) {
        throw new Error('jwttoken is not defined')
    }

    const auth = jwt.decode(jwttoken, { json: true })

    if(!auth || !auth.code){
        throw new Error('auth is not valid')
    }
    // const token = await  getAccessToken()
    // const response = await axios.get('https://api.spotify.com/v1/me/tracks?offset=0&limit=5', {
    //     headers: {
    //         'Authorization': `Bearer ${token}`
    //     }
    // })
    // return  response
    return auth
}

// export const getAll = async () => {
//     return await getTopTracks()
//     // .then((respose: unknown) => {
//     //   const topTrackData = respose as TopTrack;
//     //   return topTrackData.items.map((item: SpotifyTrack) => {
//     //     return {
//     //       albumName: item.album.name,
//     //       albumReleaseDate: item.album.release_date,
//     //       artists: item.artists.map((artist: SpotifyArtist) => {
//     //         return {
//     //           name: artist.name,
//     //           spotifyUrl: artist.external_urls.spotify
//     //         };
//     //       }),
//     //       trackName: item.name,
//     //       trackUrl: item.external_urls.spotify
//     //     } as Track
//     //   })
//     // }).catch(error => {
//     //   throw new Error(error);
//     // })
// }

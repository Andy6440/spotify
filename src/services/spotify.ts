
import axios from 'axios'
import { Artist, SpotifyArtist, SpotifyTrack, TopTrack, Track } from '../interfaces/spotify'

export const getTopTrack = (token:string):Promise<TopTrack> => {
    const endpoint = 'v1/me/top/tracks?time_range=short_term&limit=5'
    // const token = 'BQCDPgNVYSQxEUk1n2rigF4XeYt96aK2HK0M1a4AyLCj3dVUgoocviLWYxGhJPNPMIttwPnunN_wf1Hq3iCtcXIPgrQc0GL5hu0jm2pFcYoCDxg6k-NCcyfJVG6XukycG_u7rPxHm18lVwt_YRruz5ewcystKYfmqvetXjRSATkJ7NQ5Mm-idNdGAwa8nz3hETfoN056mUdIN5Rko5rVu33h5wbhbI-3N6TlhaPuKBppDEYgOqFScndDZtu0OtONCcY7Kg'
  
    return new Promise((resolve, reject) => {
        axios
            .get(`https://api.spotify.com/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                resolve(response.data as TopTrack)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getAll =  (token:string):Promise<Track[]> => {
    return new Promise((resolve,reject)=>{
        getTopTrack(token)
            .then((response) => {
                const topTrackData = response as TopTrack
                const items = topTrackData.items.map((item: SpotifyTrack) => {
                    const artists = item.artists.map((artist: SpotifyArtist) => {
                        return {
                            name: artist.name,
                            spotifyUrl: artist.external_urls.spotify,
                        } as Artist
                    })
    
                    return {
                        albumName: item.album.name,
                        albumReleaseDate: item.album.release_date,
                        artists,
                        trackName: item.name,
                        trackUrl: item.external_urls.spotify,
                    } as Track
                })
    
                resolve(items)
            }).catch(error => {
                reject(error)
            })
    })
}

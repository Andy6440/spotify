import { Artist, SpotifyArtist, SpotifyTrack, TopTrack, Track } from '../interfaces/spotify'

export const formatTrack = (response : TopTrack) =>{
    const items = response.items.map((item: SpotifyTrack) => {
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

    return items

}
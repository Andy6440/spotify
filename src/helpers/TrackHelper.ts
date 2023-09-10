import { UserTopTrack } from '../interfaces/Track'
import { Artist, SpotifyArtist, SpotifyTrack, TopTrack, Track } from '../interfaces/spotify'
import { formatItem } from './PlaylistHelper'

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

export const formatUserTopTrack = (response : UserTopTrack) =>{
    
    const items = formatItem(response.items)
    return {
        href: response.href,
        limit: response.limit,
        next: response.next,
        offset: response.offset,
        previous: response.previous,
        total: response.total,
        items:items
    } as UserTopTrack
}
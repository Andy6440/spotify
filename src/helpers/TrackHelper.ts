import { UserTopTrack } from '../interfaces/Track'
import { Artist, SpotifyArtist, SpotifyTrack, TopTrack, Track } from '../interfaces/spotify'
import { formatItem } from './PlaylistHelper'

/**
 * Formats the response from the Spotify API into a custom Track object.
 * @param response - The response from the Spotify API.
 * @returns An array of Track objects.
 */
export const formatTrack = (response: TopTrack): Track[] => {
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

/**
 * Formats the user's top track data.
 * @param response - The response object containing the user's top track data.
 * @returns The formatted user's top track data.
 */
export const formatUserTopTrack = (response: UserTopTrack): UserTopTrack => {
    // Format the items array using the formatItem function
    const items = formatItem(response.items)

    // Return the formatted user's top track data
    return {
        href: response.href,
        limit: response.limit,
        next: response.next,
        offset: response.offset,
        previous: response.previous,
        total: response.total,
        items: items
    }
}

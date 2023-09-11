import { Item,Track, Playlist,Artist,Album } from '../interfaces/playlist'

/**
 * Formats a playlist object.
 * 
 * @param response - The original playlist.
 * @returns - Formatted playlist with selected properties.
 */
export const formatPlaylist = (response : Playlist) =>{    
    const items = formatItem(response.tracks.items)
    return {
        id:response.id,
        name:response.name,
        external_urls: {
            spotify:response.external_urls.spotify
        },
        tracks : {
            items:items
        } 

    } as Playlist
    
}

/**
 * Formats an array of items by processing each item's track using the `formatTrack` function.
 * 
 * @param items - An array of items to be formatted.
 * @returns An array of formatted items.
 */
export const formatItem = (items:Item[]) =>{
    return items.map((item: Item) => {
        const track = formatTrack(item.track)        
        
        return {
            added_at: item.added_at,
            track:track
        } as Item
    })
}


/**
 * Format a track object.
 * @param track - The track object to format.
 * @returns The formatted track object.
 */
const formatTrack = (track: Track): Track => {
    // Format the artists
    const trackArtists = formatArtist(track.artists)

    // Format the album
    const album = formatAlbum(track.album)

    // Return the formatted track object
    return {
        album: album,
        artists: trackArtists,
        external_urls: {
            spotify: track.external_urls.spotify,
        },
        id: track.id,
        name: track.name,
        popularity: track.popularity,
        track: track.track,
        track_number: track.track_number,
        type: track.type,
    }
}


/**
 * Formats an array of Artist objects.
 * 
 * @param items - The array of Artist objects to format.
 * @returns The formatted array of Artist objects.
 */
const formatArtist = (items: Artist[]): Artist[] => {
    // Map over each artist object in the array
    return items.map((artist: Artist) => {
        // Return a new object with selected properties
        return {
            id: artist.id,
            name: artist.name,
            external_urls: {
                spotify: artist.external_urls.spotify
            },
            href: artist.href,
            type: artist.type,
            uri: artist.uri,
        } as Artist
    })
}

/**
 * Format an album object.
 * @param album - The album object to format.
 * @returns The formatted album object.
 */
const formatAlbum = (album: Album): Album => {
    // Format the artists
    const artists = formatArtist(album.artists)

    // Return the formatted album object
    return {
        album_type: album.album_type,
        artists: artists,
        external_urls: {
            spotify: album.external_urls.spotify
        },
        id: album.id,
        name: album.name,
        release_date: album.release_date,
        total_tracks: album.total_tracks,
    }
}


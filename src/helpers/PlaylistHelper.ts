import { Item,Track, Playlist,Artist,Album } from '../interfaces/playlist'

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
const formatItem = (items:Item[]) =>{
    return items.map((item: Item) => {
        const track = formatTrack(item.track)        
        
        return {
            added_at: item.added_at,
            track:track
        } as Item
    })
}
const formatTrack =(track :Track)=>{
    const TrackArtists =  formatArtist(track.artists)
    const album =formatAlbum(track.album)
    return {
        album:album,
        artists: TrackArtists,
        external_urls: {
            spotify:track.external_urls.spotify
        },
        id: track.id,
        name:track.name,
        popularity: track.popularity,
        track: track.track,
        track_number: track.track_number,
        type: track.type
    } as Track
}
const formatArtist = (items:Artist[]) =>{
    return  items.map((artist: Artist) => {
        return {
            id: artist.id,
            name: artist.name,
            external_urls: {
                spotify:artist.external_urls.spotify
            },
            href: artist.href,
            type: artist.type,
            uri: artist.uri,
        } as Artist
    }) 
}
const formatAlbum = (album:Album) =>{
    const artists = formatArtist(album.artists)
    return   {
        album_type:album.album_type,
        artists: artists,
        external_urls :{
            spotify:album.external_urls.spotify
        },
        id: album.id,
        name: album.name,
        release_date: album.release_date,
        total_tracks: album.total_tracks,
    
    } as Album
}


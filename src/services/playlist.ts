import { formatPlaylist } from '../helpers/PlaylistHelper'
import { Playlist } from '../interfaces/playlist'
import { get } from '../utils/services'




export const getPlaylistById = (id: string ):Promise<Playlist> => {
    const endpoint = `v1/playlists/${id}`
    return new Promise((resolve, reject) => {
        get(endpoint)
            .then((response) => {
                const playlist = response as Playlist
                const result = formatPlaylist(playlist)
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


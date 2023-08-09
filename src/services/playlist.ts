import { formatPlaylist } from '../helpers/PlaylistHelper'
import {  CreatePlaylist, Playlist } from '../interfaces/playlist'
import { get, post } from '../utils/services'




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
export const create = (userId: string,params: CreatePlaylist ):Promise<Playlist> => {
    const endpoint = `v1/users/${userId}/playlists`
    const queryParams = {
        name: params.name,
        description: params.description,
        public: params.public,
    } 
    return new Promise((resolve, reject) => {
        post(endpoint,queryParams)
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


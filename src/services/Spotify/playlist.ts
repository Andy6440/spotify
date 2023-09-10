import { formatItem, formatPlaylist } from '../../helpers/PlaylistHelper'
import {  CreatePlaylist, Item, Playlist, RemoveItems, SaveItems } from '../../interfaces/playlist'
import { get, post, put, remove } from '../../utils/services'




export const getPlaylistById = (id: string ):Promise<Playlist> => {
    const endpoint = `v1/playlists/${id}`
    return new Promise((resolve, reject) => {
        get(endpoint,'')
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
export const saveItems = (id: string,params: SaveItems ):Promise<JSON> => {
    const endpoint = `v1/playlists/${id}/tracks`

    const queryParams = {
        uris: params.tracks,
        position: params.position,
    } 
    return new Promise((resolve, reject) => {
        post(endpoint,queryParams)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const editDetails = (id: string, params: CreatePlaylist): Promise<any> => {
    const endpoint = `v1/playlists/${id}`
    const queryParams = {
        name: params.name,
        description: params.description,
        public: params.public,
    }
    return new Promise((resolve, reject) => {
        put(endpoint, queryParams)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export const getItemsById = (id: string,limit : string , offset :string ):Promise<Item[]> => {
    const endpoint = `v1/playlists/${id}/tracks?time_range=short_term&offset=${offset}&limit=${limit}`
    return new Promise((resolve, reject) => {
        get(endpoint,'')
            .then((response) => {
                const result = formatItem(response.items)
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const removeItems = (id: string,params: RemoveItems ):Promise<JSON> => {
    const endpoint = `v1/playlists/${id}/tracks`
    const queryParams = {
        tracks: params.tracks,
        snapshot_id: params.snapshot_id,
    } 
    return new Promise((resolve, reject) => {
        remove(endpoint,queryParams)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
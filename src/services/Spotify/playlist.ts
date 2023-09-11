import { formatItem, formatPlaylist } from '../../helpers/PlaylistHelper'
import {  CreatePlaylist, Item, Playlist, RemoveItems, SaveItems } from '../../interfaces/playlist'
import { get, post, put, remove } from '../../utils/services'

/**
 * Fetches a playlist by its ID.
 * 
 * @param id - The ID of the playlist.
 * @param token - Authentication token.
 * @returns A promise that resolves to the fetched playlist.
 */
export const getPlaylistById = (id: string,token:string ):Promise<Playlist> => {
    const endpoint = `playlists/${id}`
    return new Promise((resolve, reject) => {
        get(endpoint,token)
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
/**
 * Creates a new playlist for a user.
 * 
 * @param userId - The ID of the user.
 * @param params - Parameters for creating the playlist.
 * @param token - Authentication token.
 * @returns A promise that resolves to the created playlist.
 */
export const create = (userId: string,params: CreatePlaylist,token: string):Promise<Playlist> => {
    const endpoint = `users/${userId}/playlists`
    const queryParams = {
        name: params.name,
        description: params.description,
        public: params.public,
    } 
    return new Promise((resolve, reject) => {
        post(endpoint,queryParams,token)
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
/**
 * Saves items to a playlist.
 * 
 * @param id - The ID of the playlist.
 * @param params - Parameters for saving items.
 * @param token - Authentication token.
 * @returns A promise that resolves to a JSON response.
 */
export const saveItems = (id: string,params: SaveItems,token:string ):Promise<JSON> => {
    const endpoint = `playlists/${id}/tracks`
    const queryParams = {
        uris: params.uris,
        position: params.position,
    } 
    return new Promise((resolve, reject) => {
        post(endpoint,queryParams,token)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * Edits the details of a playlist.
 * 
 * @param id - The ID of the playlist.
 * @param params - Parameters for editing the playlist.
 * @param token - Authentication token.
 * @returns A promise that resolves to the edited playlist details.
 */
export const editDetails = (id: string, params: CreatePlaylist,token:string): Promise<any> => {
    const endpoint = `playlists/${id}`
    const queryParams = {
        name: params.name,
        description: params.description,
        public: params.public,
    }
    return new Promise((resolve, reject) => {
        put(endpoint, queryParams,token)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * Fetches items from a playlist by its ID.
 * 
 * @param id - The ID of the playlist.
 * @param limit - Maximum number of items to fetch.
 * @param offset - The starting index of items to fetch.
 * @param token - Authentication token.
 * @returns A promise that resolves to the fetched items.
 */
export const getItemsById = (id: string,limit : string , offset :string,token:string ):Promise<Item[]> => {
    const endpoint = `playlists/${id}/tracks?time_range=short_term&offset=${offset}&limit=${limit}`
    return new Promise((resolve, reject) => {
        get(endpoint,token)
            .then((response) => {
                const result = formatItem(response.items)
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
/**
 * Removes items from a playlist.
 * 
 * @param id - The ID of the playlist.
 * @param params - Parameters for removing items.
 * @param token - Authentication token.
 * @returns A promise that resolves to a JSON response.
 */
export const removeItems = (id: string,params: RemoveItems,token:string ):Promise<JSON> => {
    const endpoint = `playlists/${id}/tracks`
        
    const queryParams = {
        tracks: params.tracks,
        snapshot_id: params.snapshot_id,
    } 
    return new Promise((resolve, reject) => {
        remove(endpoint,queryParams,token)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
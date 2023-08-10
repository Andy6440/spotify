import { formatPlaylist } from '../helpers/PlaylistHelper'
import {  CreatePlaylist, Playlist } from '../interfaces/playlist'
import { get, post, put } from '../utils/services'




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

export const editDetails = (id: string, params: CreatePlaylist): Promise<string> => {
    const endpoint = `v1/playlists/${id}`
    const queryParams = {
        name: params.name,
        description: params.description,
        public: params.public,
    }
    return new Promise((resolve, reject) => {
        put(endpoint, queryParams)
            .then((response) => {
                const statusCode = response.status
                let message = ''
                switch (statusCode) {
                case 200:
                    message ='Playlist updated successfully'
                    break
                case 401:
                    message ='Bad or expired token. This can happen if the user revoked a token or the access token has expired. You should re-authenticate the user.'
                    break
                case 403:
                    message ='Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won\'t help here'
                    break
                case 429:
                    message ='The app has exceeded its rate limits. Retry later.'
                    break
                default:
                    message =  'Something went wrong'
                
                }
                resolve(message)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
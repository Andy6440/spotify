
// import axios from 'axios'
import { formatTrack, formatUserTopTrack } from '../../helpers/TrackHelper'
import { UserTopTrack } from '../../interfaces/Track'
import { TopTrack, Track } from '../../interfaces/spotify'
import { get } from '../../utils/services'

/**
 * Fetches a list of top tracks for the authenticated user.
 * 
 * @param limit - Maximum number of tracks to return.
 * @param offset - The index of the first track to return.
 * @param token - Authentication token for the user.
 * @returns A promise that resolves to an array of tracks.
 */
export const getAll = (limit: string ,offset:string,token:string ):Promise<Track[]> => {
    const newLimit =  parseInt(limit ) ||process.env.LIMIT
    const newOffset =  parseInt(offset) || process.env.OFFSET
    const endpoint = `me/top/tracks?time_range=medium_term&limit=${newLimit}&offset=${newOffset}`
    return new Promise((resolve, reject) => {
        get(endpoint,token)
            .then((response) => {
                const topTrackData = response as TopTrack
                const result = formatTrack(topTrackData)
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * Fetches a list of songs liked by the authenticated user.
 * 
 * @param limit - Maximum number of songs to return.
 * @param offset - The index of the first song to return.
 * @param token - Authentication token for the user.
 * @returns A promise that resolves to an object representing the user's top tracks.
 */
export const getLikedSongs =   (limit: string ,offset:string ,token:string):Promise<UserTopTrack> => {
    // const endpoint = 'v1/me/tracks?limit=20&offset=0'
    const newLimit =  parseInt(limit ) ||process.env.LIMIT
    const newOffset =  parseInt(offset) || process.env.OFFSET
    const endpoint = `me/tracks?limit=${newLimit}&offset=${newOffset}`
    return new Promise((resolve,reject)=>{
        get(endpoint,token) .then((response) => {
            const userTopTrack = response as UserTopTrack
            const result = formatUserTopTrack(userTopTrack)
            resolve(result)
        }).catch(error => {
            reject(error)
        })
    })
}

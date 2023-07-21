
// import axios from 'axios'
import { formatTrack } from '../helpers/TrackHelper'
import { TopTrack, Track } from '../interfaces/spotify'
import { get } from '../utils/services'

export const getAll = (limit: string ,offset:string ):Promise<Track[]> => {
    const newLimit =  parseInt(limit ) ||process.env.LIMIT
    const newOffset =  parseInt(offset) || process.env.OFFSET
    const endpoint = `v1/me/top/tracks?time_range=short_term&offset=${newOffset}&limit=${newLimit}`
    return new Promise((resolve, reject) => {
        get(endpoint)
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


export const getLikedSongs =   (limit: string ,offset:string ):Promise<Track[]> => {
    // const endpoint = 'v1/me/tracks?limit=20&offset=0'
    const newLimit =  parseInt(limit ) ||process.env.LIMIT
    const newOffset =  parseInt(offset) || process.env.OFFSET
    console.log(newLimit,newOffset)
    const endpoint = 'v1/me/tracks?offset=0&limit=20'
    return new Promise((resolve,reject)=>{
        get(endpoint) .then((response) => {
            const topTrackData = response as TopTrack
            const result = formatTrack(topTrackData)
            resolve(result)
        }).catch(error => {
            reject(error)
        })
    })
}

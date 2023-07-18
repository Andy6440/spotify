
// import axios from 'axios'
import { formatTrack } from '../helpers/TrackHelper'
import { TopTrack, Track } from '../interfaces/spotify'
import { get } from '../utils/services'

export const getAll = ():Promise<Track[]> => {
    const endpoint = 'v1/me/top/tracks?time_range=short_term&limit=5'
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


export const getLikedSongs =  ()/* :Promise<Track[]> */ => {
    // const endpoint = 'v1/me/tracks?limit=20&offset=0'
    const endpoint = 'v1/me/top/tracks?time_range=short_term&limit=5'
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

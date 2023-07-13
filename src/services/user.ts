import axios from 'axios'
import { SpotifyAccess } from '../interfaces/spotify'

export const getProfile = (access_spotify:SpotifyAccess ) => {
    const { access_token, token_type } = access_spotify
    console.log(access_token,token_type)
    const getProfile = 'https://api.spotify.com/v1/me'

    return  axios.get(getProfile, {
        headers: {
            Authorization: `${token_type} ${access_token}`
        }
    })
} 

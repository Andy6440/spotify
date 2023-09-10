import axios from 'axios'
import querystring from 'query-string'
import crypto from 'crypto'
import AuthenticationError from '../../models/errors/AuthenticationError'
import { get } from '../../utils/services'
const stateKey = crypto.randomBytes(20).toString('hex')

const generateRandomString = (length : number) => {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

export const  redirectString = () =>{
    
    const state = generateRandomString(16)
  
    const scope = 'user-read-private user-read-email user-top-read user-library-read user-library-modify playlist-modify-public playlist-modify-private'   
  
    const queryParams = querystring.stringify({
        client_id: process.env.CLIENT_ID,
        response_type: 'code',
        redirect_uri:  process.env.REDIRECT_URI,
        state: state,
        scope: scope,
    })
    return {
        state:state,
        stateKey:stateKey,
        param:queryParams
    }
}

export const  getAccessToken = async(code:string) => {
    const postHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    }  
    const client_id=process.env.CLIENT_ID
    const client_secret=process.env.CLIENT_SECRET
    const redirect_uri=process.env.REDIRECT_URI
    return axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        params: {
            client_id,
            client_secret,
            grant_type: 'authorization_code',
            code,
            redirect_uri,
        },
        headers: postHeaders,
    })
        .then((response) => {
            if (response.status === 200) {
                return {
                    access_token: response.data.access_token,
                    refresh_token: response.data.refresh_token,
                }
            } else {
                throw new AuthenticationError('Invalid token')
            }
        })
        .catch((error) => {
            throw new AuthenticationError(error.response.data.error_description)
        })
}
export const  getUser = async(access_token:string) => {
    const getUrl = 'me'    
    return  await  get(getUrl,access_token).then((response) => {
        return response
    })
        .catch((error) => {
            throw new AuthenticationError(error.response.data.error)
        })
}
import axios from 'axios'
import querystring from 'query-string'
import crypto from 'crypto'
import AuthenticationError from '../../models/errors/AuthenticationError'
import { get, postBasicAuth } from '../../utils/services'
const stateKey = crypto.randomBytes(20).toString('hex')

/**
 * Generates a random string of the given length.
 * 
 * @param length - Length of the string to generate.
 * @returns A random string.
 */
const generateRandomString = (length : number) => {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

/**
 * Constructs the redirect string for Spotify authentication.
 * 
 * @returns An object containing the state, stateKey, and query parameters.
 */
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

/**
 * Fetches the access token from Spotify using the provided code.
 * 
 * @param code - The authorization code.
 * @returns A promise that resolves to an object containing the access and refresh tokens.
 * @throws {AuthenticationError} Throws an error if the token is invalid or any other authentication error occurs.
 */
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
                return response.data
            } else {
                throw new AuthenticationError('Invalid token')
            }
        })
        .catch((error) => {
            throw new AuthenticationError(error.response.data.error_description)
        })
}
export const  refreshAccessToken = async(refresh_token:string) => {
    const url = 'token' 
    const data  = `grant_type=refresh_token&refresh_token=${refresh_token}`
    return  await  postBasicAuth(url,data).then((response) => {
        return response
    })
        .catch((error) => {
            throw new AuthenticationError(error.response.data.error)
        })
}
/**
 * Fetches the authenticated user's details from Spotify.
 * 
 * @param access_token - The access token for the user.
 * @returns A promise that resolves to the user's details.
 * @throws {AuthenticationError} Throws an error if there's an issue fetching the user's details.
 */
export const  getUser = async(access_token:string) => {
    const getUrl = 'me'    
    return  await  get(getUrl,access_token).then((response) => {
        return response
    })
        .catch((error) => {
            throw new AuthenticationError(error.response.data.error)
        })
}
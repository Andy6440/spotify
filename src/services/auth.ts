import axios from 'axios'
import querystring from 'query-string'
const AUTH_URL = 'https://accounts.spotify.com/api/token'

const generateRandomString = (length : number) => {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
  
  
const stateKey = 'spotify_auth_state'

export const  redirectString = () =>{
    const state = generateRandomString(16)
  
    const scope = 'user-read-private user-read-email'
  
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

export const  getAccessToken = async() => {
    const b64 = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
  
    return (
        await axios({
            method: 'POST',
            url: AUTH_URL,
            data: 'grant_type=client_credentials',
            headers: {
                Authorization: `Basic ${b64}`,
                'content-type': 'application/x-www-form-urlencoded',
            },
        })
    ).data
}
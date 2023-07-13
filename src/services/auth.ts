import axios from 'axios'
import querystring from 'query-string'
import crypto from 'crypto'
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

// export const  getAccessToken = async() => {
//     const b64 = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
  
//     return (
//         await axios({
//             method: 'POST',
//             url: AUTH_URL,
//             data: 'grant_type=client_credentials',
//             headers: {
//                 Authorization: `Basic ${b64}`,
//                 'content-type': 'application/x-www-form-urlencoded',
//             },
//         })
//     ).data
// }
export const  getAccessToken = (code:string) => {
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
                throw new Error('Invalid token')
            }
        })
        .catch((error) => {
            throw new Error(error.response.data.error)
        })
}
export const  getUser = async(access_token:string) => {
    const getUrl = 'https://api.spotify.com/v1/me'
    const getHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${access_token}`,
    }
          
    return axios({
        method: 'get',
        url: getUrl,
        headers: getHeaders,
    }).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error('Failed to get user profile')
        }
    })
        .catch((error) => {
            throw new Error(error.response.data.error)
        })
}

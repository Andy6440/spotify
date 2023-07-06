import queryString from 'query-string'
const token : string = Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')

export const redirectString = () => {
    
    const state = generateRandomString(16)
    const scope = 'user-read-private user-read-email'
    
    return  queryString.stringify({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri:process.env.REDIRECT_URI,
        state: state
    })

}
export const callBack = (code :string |null, _state:string | null) => {
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + token
        },
        json: true
    }
    return authOptions

}
export const generateRandomString = (length:number) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}
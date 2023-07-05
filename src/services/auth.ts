import axios from 'axios'

const data = new URLSearchParams()
data.append('grant_type', 'client_credentials')
const code = Buffer.from('0a966421646b400ab89a00284f5e7b87:71bd1890bc8d4548b0cab0bbfa41af0e').toString('base64')
const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': `Basic ${code}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
}
const getToken = async () => {
    return await axios(authOptions)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Network response was not ok')
            }
            return response.data
        })
        .catch(error => {
            throw new Error(error)
            // error.response.data
        })
}
export const getData = async (endpoint: string) => {

    const result = await getToken()
    if (!result.access_token) {
        throw new Error('No existe token')
    }
    console.log('=========',`https://api.spotify.com/${endpoint}`)
    console.log('=========','Authorization:' ,`Bearer ${result.access_token}`)
    const response =  await axios.get(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${result.access_token}`
        }
    })
    
    if (response.status != 200) {
        throw new Error('Network response was not ok')
    }
    
    return response

}
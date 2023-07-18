import axios from 'axios'



export const get = (endpoint:string):Promise<any> => {  
    const token = process.env.TOKEN as string
    return new Promise((resolve, reject) => {
        console.log('llega al endpoint',`https://api.spotify.com/${endpoint}`,token)
        axios
            .get(`https://api.spotify.com/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
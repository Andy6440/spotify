import axios from 'axios'



export const get = (endpoint:string):Promise<any> => {  
    const token = process.env.TOKEN as string
    return new Promise((resolve, reject) => {
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
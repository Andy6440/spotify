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
export const post = (endpoint:string,data: any):Promise<any> => {  
    const token = process.env.TOKEN as string
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
    console.log(headers,endpoint,data)
    return new Promise((resolve, reject) => {
        axios.post(`https://api.spotify.com/${endpoint}`, data, { headers })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
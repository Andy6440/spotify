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
export const remove = (endpoint:string,data: any):Promise<any> => {  
    const token = process.env.TOKEN as string
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
    const config = {
        headers: headers,
        data : data
    }
    return new Promise((resolve, reject) => {
        axios.delete(`https://api.spotify.com/${endpoint}`,config)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
export const put = (endpoint:string,data: any):Promise<any> => {  
    const token = process.env.TOKEN as string
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
    return new Promise((resolve, reject) => {
        axios.put(`https://api.spotify.com/${endpoint}`, data, { headers })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
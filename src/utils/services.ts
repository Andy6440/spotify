import axios from 'axios'
import AuthenticationError from '../models/errors/AuthenticationError'

export const get = async (endpoint: string, access_token: string): Promise<any> => {
    
    const getHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${access_token}`,
    }
    return await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/${endpoint}`,
        headers: getHeaders,
    })
        .then((response) => {            
            return response.data
        })
        .catch((error) => {
            throw new AuthenticationError(error.response.data.error)
        })
}

export const post = async (endpoint: string, data: any, access_token: string): Promise<any> => {
    
    const postHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json', // Cambiado a 'application/json' para enviar datos JSON
        Authorization: `Bearer ${access_token}`,
    }
    return await axios({
        method: 'post',
        url: `https://api.spotify.com/v1/${endpoint}`,
        headers: postHeaders,
        data: JSON.stringify(data) // Aquí es donde enviamos los datos
    })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw new AuthenticationError(error.response.data.error)
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
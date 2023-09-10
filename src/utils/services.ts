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

export const remove = async (endpoint: string, data: any, access_token: string): Promise<any> => {
    
    const postHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json', // Cambiado a 'application/json' para enviar datos JSON
        Authorization: `Bearer ${access_token}`,
    }
    
    return await axios({
        method: 'delete',
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
export const put = async (endpoint: string, data: any, access_token: string): Promise<any> => {
    
    const postHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json', // Cambiado a 'application/json' para enviar datos JSON
        Authorization: `Bearer ${access_token}`,
    }
    
    return await axios({
        method: 'put',
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
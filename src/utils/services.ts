import axios from 'axios'
import AuthenticationError from '../models/errors/AuthenticationError'

/**
 * Sends a GET request to the specified Spotify API endpoint.
 * 
 * @param endpoint - The Spotify API endpoint.
 * @param access_token - The access token for authentication.
 * @returns The response data from the API.
 * @throws {AuthenticationError} Throws an error if the request fails.
 */
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

/**
 * Sends a POST request to the specified Spotify API endpoint.
 * 
 * @param endpoint - The Spotify API endpoint.
 * @param data - The data to be sent in the request body.
 * @param access_token - The access token for authentication.
 * @returns The response data from the API.
 * @throws {AuthenticationError} Throws an error if the request fails.
 */
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

/**
 * Sends a DELETE request to the specified Spotify API endpoint.
 * 
 * @param endpoint - The Spotify API endpoint.
 * @param data - The data to be sent in the request body.
 * @param access_token - The access token for authentication.
 * @returns The response data from the API.
 * @throws {AuthenticationError} Throws an error if the request fails.
 */
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

/**
 * Sends a PUT request to the specified Spotify API endpoint.
 * 
 * @param endpoint - The Spotify API endpoint.
 * @param data - The data to be sent in the request body.
 * @param access_token - The access token for authentication.
 * @returns The response data from the API.
 * @throws {AuthenticationError} Throws an error if the request fails.
 */
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
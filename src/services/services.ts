/* // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQAiN-5GM9n7f7dBuz4bmAQbVSZ_Cnk6b8bODpewMUdGRfyh27yT9ztdpXeKRL1X52bfs0R7lmH6YAp2QCqhWoYw5lX993Q-jFEVDKJFHn34FjABtvRbflmA8G95clfQCEOLiX8VmvzDBEKItPU4_NRaICkMdIl4qhcHKYk7VW482XWJAiiAdRccUYzNj3-NX6G74vC7pBdZMzguDBIVG8pe379mqXHKEyYS6PgjfPIlVFrz_Ab1mEM8SMIr5c8CSae_GA';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
); */
import { WeatherI } from '../types'
import serviceData from './service.json'
const diares: Array<WeatherI> = serviceData as Array<WeatherI>
export const getTop = () => diares
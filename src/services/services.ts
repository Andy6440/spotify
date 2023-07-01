/* 
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization


*/
async function fetchWebApi(endpoint: string, method: string) {

  try {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      method,
      // body:JSON.stringify( [])
    });
    return await res.json();
  } catch (error) {
    console.error('Error parsing response body:', error);
  }
}


async function getTopTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  const endpoint = 'v1/me/top/tracks?time_range=short_term&limit=5';
  const method = 'GET';
  return await fetchWebApi(endpoint, method);
}

export const getAll = async () => {
  const topTracks = await getTopTracks();
  return topTracks
};
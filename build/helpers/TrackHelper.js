"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTrack = void 0;
const formatTrack = (response) => {
    const items = response.items.map((item) => {
        const artists = item.artists.map((artist) => {
            return {
                name: artist.name,
                spotifyUrl: artist.external_urls.spotify,
            };
        });
        return {
            albumName: item.album.name,
            albumReleaseDate: item.album.release_date,
            artists,
            trackName: item.name,
            trackUrl: item.external_urls.spotify,
        };
    });
    return items;
};
exports.formatTrack = formatTrack;

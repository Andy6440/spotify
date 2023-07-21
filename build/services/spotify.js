"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikedSongs = exports.getAll = void 0;
// import axios from 'axios'
const TrackHelper_1 = require("../helpers/TrackHelper");
const services_1 = require("../utils/services");
const getAll = (limit, offset) => {
    const newLimit = parseInt(limit) || process.env.LIMIT;
    const newOffset = parseInt(offset) || process.env.OFFSET;
    const endpoint = `v1/me/top/tracks?time_range=short_term&offset=${newOffset}&limit=${newLimit}`;
    return new Promise((resolve, reject) => {
        (0, services_1.get)(endpoint)
            .then((response) => {
            const topTrackData = response;
            const result = (0, TrackHelper_1.formatTrack)(topTrackData);
            resolve(result);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.getAll = getAll;
const getLikedSongs = (limit, offset) => {
    // const endpoint = 'v1/me/tracks?limit=20&offset=0'
    const newLimit = parseInt(limit) || process.env.LIMIT;
    const newOffset = parseInt(offset) || process.env.OFFSET;
    console.log(newLimit, newOffset);
    const endpoint = 'v1/me/tracks?offset=0&limit=20';
    return new Promise((resolve, reject) => {
        (0, services_1.get)(endpoint).then((response) => {
            const topTrackData = response;
            const result = (0, TrackHelper_1.formatTrack)(topTrackData);
            resolve(result);
        }).catch(error => {
            reject(error);
        });
    });
};
exports.getLikedSongs = getLikedSongs;

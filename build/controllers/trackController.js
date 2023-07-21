"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likedSongs = exports.topTrack = void 0;
const spotify_1 = require("../services/spotify");
const topTrack = (req, res, next) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    (0, spotify_1.getAll)(limit, offset)
        .then(response => {
        res.send(response);
    })
        .catch(err => next(err));
};
exports.topTrack = topTrack;
const likedSongs = async (req, res, next) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    (0, spotify_1.getLikedSongs)(limit, offset)
        .then(response => {
        res.send(response);
    })
        .catch(err => next(err));
};
exports.likedSongs = likedSongs;

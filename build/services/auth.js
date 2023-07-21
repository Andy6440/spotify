"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getAccessToken = exports.redirectString = void 0;
const axios_1 = __importDefault(require("axios"));
const query_string_1 = __importDefault(require("query-string"));
const crypto_1 = __importDefault(require("crypto"));
const AppError_1 = __importDefault(require("../models/errors/AppError"));
const stateKey = crypto_1.default.randomBytes(20).toString('hex');
const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
const redirectString = () => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';
    const queryParams = query_string_1.default.stringify({
        client_id: process.env.CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.REDIRECT_URI,
        state: state,
        scope: scope,
    });
    return {
        state: state,
        stateKey: stateKey,
        param: queryParams
    };
};
exports.redirectString = redirectString;
const getAccessToken = async (code) => {
    const postHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;
    return (0, axios_1.default)({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        params: {
            client_id,
            client_secret,
            grant_type: 'authorization_code',
            code,
            redirect_uri,
        },
        headers: postHeaders,
    })
        .then((response) => {
        if (response.status === 200) {
            return {
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
            };
        }
        else {
            throw new AppError_1.default(401, 'Invalid token');
        }
    })
        .catch((error) => {
        throw new AppError_1.default(error.response.status, error.response.data.error);
    });
};
exports.getAccessToken = getAccessToken;
const getUser = async (access_token) => {
    const getUrl = 'https://api.spotify.com/v1/me';
    const getHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${access_token}`,
    };
    return (0, axios_1.default)({
        method: 'get',
        url: getUrl,
        headers: getHeaders,
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
        throw new AppError_1.default(error.response.status, error.response.data.error);
    });
};
exports.getUser = getUser;

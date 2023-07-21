"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callback = exports.login = void 0;
const auth_1 = require("../services/auth");
const AppError_1 = __importDefault(require("../models/errors/AppError"));
const login = (_req, res) => {
    res.clearCookie('code');
    const query = (0, auth_1.redirectString)();
    res.redirect(`https://accounts.spotify.com/authorize?${query.param}`);
};
exports.login = login;
const callback = async (req, res) => {
    const code = req.query.code;
    res.cookie('code', code);
    try {
        const tokens = await (0, auth_1.getAccessToken)(code);
        const user = await (0, auth_1.getUser)(tokens.access_token);
        res.send({ user: user, token: tokens.access_token });
    }
    catch (err) {
        throw new AppError_1.default(401, 'An error occurred in callback');
    }
};
exports.callback = callback;

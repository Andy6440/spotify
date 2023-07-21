"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../models/errors/AppError"));
function errorHandler(err, _req, res) {
    console.log('pasaaaa');
    let statusCode = 500;
    let message = 'Internal Server Error';
    if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    res.status(statusCode).json({ error: message });
}
exports.default = errorHandler;

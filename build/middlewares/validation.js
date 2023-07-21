"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNumberParam = exports.validateTokenParam = exports.validateRequiredParam = void 0;
const AppError_1 = __importDefault(require("../models/errors/AppError"));
// Middleware for validating a required parameter
const validateRequiredParam = (paramName) => {
    return (req, _res, next) => {
        const param = req.query[paramName];
        if (!param) {
            throw new AppError_1.default(400, `Required parameter "${paramName}" is missing`);
        }
        next();
    };
};
exports.validateRequiredParam = validateRequiredParam;
// Middleware for validating an token
const validateTokenParam = () => {
    return (_req, _res, next) => {
        const token = process.env.TOKEN || null;
        if (typeof token !== 'string') {
            throw new AppError_1.default(400, 'Invalid email');
        }
        next();
    };
};
exports.validateTokenParam = validateTokenParam;
// Middleware for validating an number param
const validateNumberParam = (name) => {
    return (req, _res, next) => {
        const param = req.query[name] ? parseInt(req.query[name]) : null;
        if (param === null || isNaN(param)) {
            throw new AppError_1.default(400, `${name}: Invalid type of number`);
        }
        next();
    };
};
exports.validateNumberParam = validateNumberParam;

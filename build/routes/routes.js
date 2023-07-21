"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const userController_1 = require("../controllers/userController");
const trackController_1 = require("../controllers/trackController");
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
/**
 *  UserController Routes
 *
 *
 */
// Route: GET /login
// Description: Endpoint for user login
router.get('/login', userController_1.login);
// Route: GET /callback
// Description: Endpoint for callback after user authentication
router.get('/callback', (0, validation_1.validateRequiredParam)('code'), userController_1.callback);
/**
 *  TrackController Routes
 *
 *
 */
// Route: GET /topTrack
// Description: Endpoint to get top track
router.get('/topTrack', (0, validation_1.validateTokenParam)(), (0, validation_1.validateNumberParam)('limit'), (0, validation_1.validateNumberParam)('offset'), trackController_1.topTrack);
// Route: GET /topTrack
// Description: Endpoint to get top track
router.get('/likedSongs', (0, validation_1.validateTokenParam)(), (0, validation_1.validateNumberParam)('limit'), (0, validation_1.validateNumberParam)('offset'), trackController_1.likedSongs);
// Middleware for handling errors
router.use(errorHandler_1.default);
exports.default = router;

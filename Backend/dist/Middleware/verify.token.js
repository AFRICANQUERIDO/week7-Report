"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerification = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokenVerification = (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (!token) {
            return res.json({
                message: 'You do not have access'
            });
        }
        const data = jsonwebtoken_1.default.verify(token, process.env.secret);
        req.info = data;
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
};
exports.tokenVerification = tokenVerification;

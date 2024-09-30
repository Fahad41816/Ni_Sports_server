"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    Port: process.env.PORT,
    Database_Url: process.env.DATABASE_URL,
    saltRounds: process.env.saltRoundsL,
    JWTSecret: process.env.JWTSecret,
};

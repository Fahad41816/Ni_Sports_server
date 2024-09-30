"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const config_1 = __importDefault(require("../../app/config"));
const User_model_1 = require("./User.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const createUserInToDb = (UserData) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield User_model_1.UserModel.create(UserData);
    return Result;
});
const LoginUserInDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const IsUserExists = yield User_model_1.UserModel.findOne({ email: userData.email });
    if (!IsUserExists) {
        throw new AppError_1.default(404, 'user not Exists');
    }
    const IsPasswordMatch = yield bcrypt_1.default.compare(userData.password, IsUserExists.password);
    if (!IsPasswordMatch) {
        throw new AppError_1.default(404, 'Password Do Not Match!');
    }
    const JwtPayload = {
        userId: IsUserExists._id,
        userPass: IsUserExists.password,
        role: IsUserExists.role,
    };
    const AccessToken = yield jsonwebtoken_1.default.sign(JwtPayload, config_1.default.JWTSecret, {
        expiresIn: '10d',
    });
    return {
        AccessToken: `Bearer ${AccessToken}`,
    };
});
const GetUserIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield User_model_1.UserModel.findById(id);
    return User;
});
const CreateadminIntoDb = (AdminData) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield User_model_1.UserModel.create(AdminData);
    return Result;
});
exports.UserService = {
    createUserInToDb,
    LoginUserInDb,
    GetUserIntoDb,
    CreateadminIntoDb
};

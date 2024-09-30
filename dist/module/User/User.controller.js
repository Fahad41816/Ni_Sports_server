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
exports.UserController = void 0;
const User_service_1 = require("./User.service");
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
// create user in db proccess
const CreateUser = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserData = req.body;
    UserData.role = 'user';
    const UserResult = yield User_service_1.UserService.createUserInToDb(UserData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User registered successfully',
        data: UserResult,
    });
}));
const CreateAdmin = (0, CatchAsync_1.default)((req, res) => {
    const Data = req.body;
    Data.role = 'admin';
    const Result = User_service_1.UserService.CreateadminIntoDb(Data);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Admin Create Successfully',
        data: Result,
    });
});
const loginUser = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Userinfo = req.body;
    const UserData = yield User_service_1.UserService.LoginUserInDb(Userinfo);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User Login successfully',
        data: UserData.AccessToken,
    });
}));
const GetUser = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserId = req.params.id;
    const Result = yield User_service_1.UserService.GetUserIntoDb(UserId);
    if (!Result) {
        return res.status(200).json({
            success: false,
            statusCode: 400,
            message: 'No User Found',
            data: Result,
        });
    }
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User retrive successfully!',
        data: Result,
    });
}));
exports.UserController = {
    CreateUser,
    loginUser,
    GetUser,
    CreateAdmin
};

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
exports.BookingController = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const Booking_services_1 = require("./Booking.services");
const GettAllBookings = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield Booking_services_1.BookingServices.GetAllBookingIntoDb();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Bookings retrieved successfully',
        data: Result,
    });
}));
const GetbookingByUserid = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userid = req.user.userId;
    const Result = yield Booking_services_1.BookingServices.GetBookingByUserIdIntoDb(userid);
    if (Result.length == 0) {
        res.status(404).json({
            success: true,
            statusCode: 404,
            message: 'No Data Found',
            data: Result,
        });
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Bookings retrieved successfully',
        data: Result,
    });
}));
const CancleBooking = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cancleResult = yield Booking_services_1.BookingServices.CancleBookingIntoDb(req.params.id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Booking cancelled successfully',
        data: cancleResult,
    });
}));
const CreateBookings = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BookingData = req.body;
    // @ts-ignore
    const userDetails = req.user;
    const Result = yield Booking_services_1.BookingServices.CreateBokkingIntoDb(userDetails, BookingData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Booking created successfully',
        data: Result,
    });
}));
exports.BookingController = {
    GettAllBookings,
    CreateBookings,
    GetbookingByUserid,
    CancleBooking,
};

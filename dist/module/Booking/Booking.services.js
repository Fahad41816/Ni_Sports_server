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
exports.BookingServices = void 0;
const AppError_1 = __importDefault(require("../../Error/AppError"));
const Facility_model_1 = require("../Facility/Facility.model");
const Booking_model_1 = require("./Booking.model");
const GetAllBookingIntoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const BookingData = yield Booking_model_1.BookingModel.find()
        .populate('user')
        .populate('facility');
    return BookingData;
});
const CreateBokkingIntoDb = (userDetails, BookingData) => __awaiter(void 0, void 0, void 0, function* () {
    // check the faculoty is avaiable
    const isExistsFacility = yield Facility_model_1.FacilityModel.findById(BookingData.facility);
    if (!isExistsFacility) {
        throw new AppError_1.default(404, 'facility is unavaiable!!');
    }
    // set user id
    BookingData.user = userDetails.userId;
    const startTime = BookingData.startTime.slice(0, 2);
    const EndTime = BookingData.endTime.slice(0, 2);
    BookingData.payableAmount =
        (Number(EndTime) - Number(startTime)) * isExistsFacility.pricePerHour;
    const AddBookingData = yield Booking_model_1.BookingModel.create(BookingData);
    return AddBookingData;
});
const GetBookingByUserIdIntoDb = (userid) => __awaiter(void 0, void 0, void 0, function* () {
    const AddBookingData = yield Booking_model_1.BookingModel.find({ user: userid }).populate('facility');
    return AddBookingData;
});
const CancleBookingIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const DeleteBooking = yield Booking_model_1.BookingModel.findByIdAndUpdate(id, {
        isBooked: 'canceled',
    }, { new: true });
    return DeleteBooking;
});
exports.BookingServices = {
    GetAllBookingIntoDb,
    CreateBokkingIntoDb,
    CancleBookingIntoDb,
    GetBookingByUserIdIntoDb,
};

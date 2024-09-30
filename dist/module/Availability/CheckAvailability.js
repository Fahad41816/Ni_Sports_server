"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const Booking_model_1 = require("../Booking/Booking.model");
const moment_1 = __importDefault(require("moment"));
// Function to get available slots
const getAvailableSlots = (bookings, totalSlots) => {
    const availableSlots = [];
    totalSlots.forEach((slot) => {
        let isAvailable = true;
        bookings.forEach((booking) => {
            const bookingStart = (0, moment_1.default)(booking.startTime, 'HH:mm');
            const bookingEnd = (0, moment_1.default)(booking.endTime, 'HH:mm');
            const slotStart = (0, moment_1.default)(slot.startTime, 'HH:mm');
            const slotEnd = (0, moment_1.default)(slot.endTime, 'HH:mm');
            if (slotStart.isBetween(bookingStart, bookingEnd, undefined, '[)') ||
                slotEnd.isBetween(bookingStart, bookingEnd, undefined, '(]') ||
                (slotStart.isSameOrBefore(bookingStart) &&
                    slotEnd.isSameOrAfter(bookingEnd))) {
                isAvailable = false;
            }
        });
        if (isAvailable) {
            availableSlots.push(slot);
        }
    });
    return availableSlots;
};
// Check Availability function
const CheckAvailability = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date: dateQuery, facility } = req.query;
    // Check if facility ID is provided
    if (!facility) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Facility ID is required',
        });
    }
    // Get current date if date query is not provided
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const date = dateQuery ? dateQuery : `${year}-${month}-${day}`;
    // Fetch bookings for the selected date and facility
    // const DateBookingSlot = await BookingModel.aggregate([
    //   {$match: { date, facility: facility}}
    // ])
    const DateBookingSlot = yield Booking_model_1.BookingModel.find({ date, facility: facility, isBooked: "confirmed" });
    // Define total slots (these could be dynamic if needed based on the facility)
    const totalSlots = [
        { startTime: '00:00', endTime: '02:00' },
        { startTime: '03:00', endTime: '06:00' },
        { startTime: '06:00', endTime: '09:00' },
        { startTime: '09:00', endTime: '12:00' },
        { startTime: '12:00', endTime: '15:00' },
        { startTime: '15:00', endTime: '18:00' },
        { startTime: '18:00', endTime: '21:00' },
        { startTime: '21:00', endTime: '24:00' },
    ];
    // Get available slots
    const availableSlots = getAvailableSlots(DateBookingSlot, totalSlots);
    if (availableSlots.length === 0) {
        return res.status(200).json({
            success: true,
            statusCode: 404,
            message: 'No time slots available for this date. ',
            data: DateBookingSlot,
        });
    }
    // Send response
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Availability checked successfully',
        data: availableSlots,
    });
}));
exports.default = CheckAvailability;

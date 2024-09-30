"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'user' },
    facility: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Facility' },
    payableAmount: { type: Number, required: true },
    TranId: { type: String, required: true },
    isBooked: {
        type: String,
        enum: ['confirmed', 'unconfirmed', 'canceled'],
        required: true
    },
});
exports.BookingModel = (0, mongoose_1.model)('Booking', BookingSchema);

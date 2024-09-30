"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRouter = void 0;
const express_1 = __importDefault(require("express"));
const Booking_controller_1 = require("./Booking.controller");
const auth_1 = __importDefault(require("../../MeddleWare/auth"));
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)('admin'), Booking_controller_1.BookingController.GettAllBookings);
router.get('/user', (0, auth_1.default)('user'), Booking_controller_1.BookingController.GetbookingByUserid);
router.post('/', (0, auth_1.default)('user'), Booking_controller_1.BookingController.CreateBookings);
router.patch('/:id', (0, auth_1.default)('user'), Booking_controller_1.BookingController.CancleBooking);
exports.BookingRouter = router;

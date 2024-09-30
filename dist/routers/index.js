"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const availability_route_1 = require("../module/Availability/availability.route");
const Booking_Route_1 = require("../module/Booking/Booking.Route");
const Facility_route_1 = require("../module/Facility/Facility.route");
const User_route_1 = require("../module/User/User.route");
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const Routers = [
    {
        path: '/auth',
        route: User_route_1.UserRoute,
    },
    {
        path: '/facility',
        route: Facility_route_1.FacilityRoute,
    },
    {
        path: '/bookings',
        route: Booking_Route_1.BookingRouter,
    },
    {
        path: '/check-availability',
        route: availability_route_1.AvailabilityRoute,
    },
];
Routers.map(route => Router.use(route.path, route.route));
exports.default = Router;

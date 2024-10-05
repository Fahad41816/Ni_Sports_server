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
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./routers"));
const NotFoundHandler_1 = __importDefault(require("./MeddleWare/NotFoundHandler"));
const GlobalErrorHandler_1 = __importDefault(require("./MeddleWare/GlobalErrorHandler"));
// SSLCommerz Payment
// @ts-ignore
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const mongoose_1 = __importDefault(require("mongoose"));
const Booking_model_1 = require("./module/Booking/Booking.model");
const store_id = 'fahad66f730a5023a4';
const store_passwd = 'fahad66f730a5023a4@ssl';
const is_live = false; //true for live, false for sandbox
// app
const app = (0, express_1.default)();
// madelware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routers_1.default);
app.get('/', (req, res) => {
    res.send('sport Facility ');
});
app.post('/Payment', (req, res) => {
    const { UserName, UserPhone, UserAddress, User_Id, BookingData } = req.body;
    // const OrderDetails = {
    //   UserName: formData.name,
    //   UserPhone: formData.number,
    //   UserAddress: formData.address,
    //   User_Id: userId,
    //   BookingData: {
    //     date,startTime, endTime, facility
    //   }
    // }
    const customId = new mongoose_1.default.Types.ObjectId().toString();
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: customId, // use unique tran_id for each api call
        success_url: `https://nisports.vercel.app/PaymentSuccess/${customId}`,
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'None',
        product_category: 'None',
        product_profile: 'general',
        cus_name: UserName,
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: UserPhone,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: UserAddress,
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new sslcommerz_lts_1.default(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => __awaiter(void 0, void 0, void 0, function* () {
        // Redirect the user to payment gateway
        const Booking = {
            date: BookingData.date,
            startTime: BookingData.startTime,
            endTime: BookingData.endTime,
            user: User_Id,
            facility: BookingData.facility,
            isBooked: 'unconfirmed',
            TranId: customId,
            payableAmount: BookingData.payableAmount,
        };
        const BookingResult = yield Booking_model_1.BookingModel.create(Booking);
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ GatewayPageURL });
    }));
});
app.post('/PaymentSuccess/:customId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customId = req.params.customId;
    const UpdateBooking = yield Booking_model_1.BookingModel.updateOne({ TranId: customId }, { $set: { isBooked: 'confirmed' } });
    res.redirect(`https://client-snowy-tau.vercel.app/PaymentSuccess/${customId}`);
}));
app.use(NotFoundHandler_1.default);
app.use(GlobalErrorHandler_1.default);
exports.default = app;

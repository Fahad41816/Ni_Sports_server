/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import cors from 'cors'
import Router from './routers'
import NotFountHandler from './MeddleWare/NotFoundHandler'
import globalErrorHandler from './MeddleWare/GlobalErrorHandler'

// SSLCommerz Payment
// @ts-ignore
import SSLCommerzPayment from 'sslcommerz-lts'
import mongoose from 'mongoose'
import { BookingModel } from './module/Booking/Booking.model'
const store_id = 'fahad66f730a5023a4'
const store_passwd = 'fahad66f730a5023a4@ssl'
const is_live = false //true for live, false for sandbox

// app
const app = express()

// madelware
app.use(cors())
app.use(express.json())

app.use('/api', Router)

app.get('/', (req, res) => {
  res.send('sport Facility ')
})

app.post('/Payment', (req, res) => {
  
  const { UserName, UserPhone, UserAddress, User_Id, BookingData } = req.body

  // const OrderDetails = {
  //   UserName: formData.name,
  //   UserPhone: formData.number,
  //   UserAddress: formData.address,
  //   User_Id: userId,
  //   BookingData: {
  //     date,startTime, endTime, facility
  //   }
  // }

  const customId = new mongoose.Types.ObjectId().toString()
  const data = {
    total_amount: 100,
    currency: 'BDT',
    tran_id: customId, // use unique tran_id for each api call
    success_url: `http://localhost:5000/PaymentSuccess/${customId}`,
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
  }
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then(async (apiResponse: { GatewayPageURL: any }) => {
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
    }

    const BookingResult = await BookingModel.create(Booking)

    let GatewayPageURL = apiResponse.GatewayPageURL
    res.send({ GatewayPageURL })
  })
})

app.post('/PaymentSuccess/:customId', async (req, res) => {
  const customId = req.params.customId

  const UpdateBooking = await BookingModel.updateOne(
    { TranId: customId },
    { $set: { isBooked: 'confirmed' } },
  )

  res.redirect(`http://localhost:5173/PaymentSuccess/${customId}`)
})

app.use(NotFountHandler)
app.use(globalErrorHandler)

export default app

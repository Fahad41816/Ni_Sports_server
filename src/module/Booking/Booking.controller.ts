/* eslint-disable @typescript-eslint/ban-ts-comment */
import CatchAsync from '../../utils/CatchAsync'
import { BookingServices } from './Booking.services'

const GettAllBookings = CatchAsync(async (req, res) => {
  const Result = await BookingServices.GetAllBookingIntoDb()

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Bookings retrieved successfully',
    data: Result,
  })
})

const GetbookingByUserid = CatchAsync(async (req , res) => {
  
 // @ts-ignore
  const userid = req.user.userId

  const Result = await BookingServices.GetBookingByUserIdIntoDb(userid)

  if (Result.length == 0) {
    res.status(404).json({
      success: true,
      statusCode: 404,
      message: 'No Data Found',
      data: Result,
    })
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Bookings retrieved successfully',
    data: Result,
  })
})

const CancleBooking = CatchAsync(async (req, res) => {
  const cancleResult = await BookingServices.CancleBookingIntoDb(req.params.id)

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Booking cancelled successfully',
    data: cancleResult,
  })
})

const CreateBookings = CatchAsync(async (req, res) => {
  const BookingData = req.body

  // @ts-ignore
  const userDetails = req.user

  const Result = await BookingServices.CreateBokkingIntoDb(
    userDetails,
    BookingData,
  )

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Booking created successfully',
    data: Result,
  })
})

export const BookingController = {
  GettAllBookings,
  CreateBookings,
  GetbookingByUserid,
  CancleBooking,
}

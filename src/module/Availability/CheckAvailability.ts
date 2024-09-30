/* eslint-disable @typescript-eslint/no-explicit-any */
 
import CatchAsync from '../../utils/CatchAsync'
import { BookingModel } from '../Booking/Booking.model'
import moment from 'moment'

// Function to get available slots
const getAvailableSlots = (bookings: any, totalSlots: any) => {
  const availableSlots: { startTime: string; endTime: string }[] = []

  totalSlots.forEach((slot: any) => {
    let isAvailable = true

    bookings.forEach((booking : any) => {
      const bookingStart = moment(booking.startTime, 'HH:mm')
      const bookingEnd = moment(booking.endTime, 'HH:mm')
      const slotStart = moment(slot.startTime, 'HH:mm')
      const slotEnd = moment(slot.endTime, 'HH:mm')

      if (
        slotStart.isBetween(bookingStart, bookingEnd, undefined, '[)') ||
        slotEnd.isBetween(bookingStart, bookingEnd, undefined, '(]') ||
        (slotStart.isSameOrBefore(bookingStart) &&
          slotEnd.isSameOrAfter(bookingEnd))
      ) {
        isAvailable = false
      }
    })

    if (isAvailable) {
      availableSlots.push(slot)
    }
  })

  return availableSlots
}

// Check Availability function
const CheckAvailability = CatchAsync(async (req, res) => {
  const { date: dateQuery, facility } = req.query

   

  // Check if facility ID is provided
  if (!facility) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Facility ID is required',
    })
  }

  // Get current date if date query is not provided
  const dateObj = new Date()
  const month = dateObj.getUTCMonth() + 1 // months from 1-12
  const day = dateObj.getUTCDate()
  const year = dateObj.getUTCFullYear()

  const date = dateQuery ? dateQuery : `${year}-${month}-${day}`

 
 
  // Fetch bookings for the selected date and facility
  // const DateBookingSlot = await BookingModel.aggregate([
  //   {$match: { date, facility: facility}}
  // ])
  const DateBookingSlot = await BookingModel.find({ date, facility: facility, isBooked: "confirmed"})

   

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
  ]

  // Get available slots
  const availableSlots = getAvailableSlots(DateBookingSlot, totalSlots)

  if(availableSlots.length === 0 ){
    return res.status(200).json({
      success: true,
      statusCode: 404,
      message: 'No time slots available for this date. ',
      data: DateBookingSlot,
    })
   }

  // Send response
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Availability checked successfully',
    data: availableSlots,
  })
})

export default CheckAvailability

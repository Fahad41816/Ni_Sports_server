import { model, Schema } from 'mongoose'
import { TBooking } from './Booking.interface'

const BookingSchema = new Schema<TBooking>({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  facility: { type: Schema.Types.ObjectId, required: true, ref: 'Facility' },
  payableAmount: { type: Number, required: true },
  TranId: { type: String, required: true },
  isBooked: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'canceled'], 
    required: true
  },
})

export const BookingModel = model('Booking', BookingSchema)

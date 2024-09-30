import { Types } from 'mongoose'
import AppError from '../../Error/AppError'
import { FacilityModel } from '../Facility/Facility.model'
import { TBooking } from './Booking.interface'
import { BookingModel } from './Booking.model'

const GetAllBookingIntoDb = async () => {
  const BookingData = await BookingModel.find()
    .populate('user')
    .populate('facility')

  return BookingData
}


const CreateBokkingIntoDb = async (userDetails: { userId: Types.ObjectId }, BookingData: TBooking) => {
  // check the faculoty is avaiable
  const isExistsFacility = await FacilityModel.findById(BookingData.facility)

  if (!isExistsFacility) {
    throw new AppError(404, 'facility is unavaiable!!')
  }

  // set user id
  BookingData.user = userDetails.userId

  const startTime = BookingData.startTime.slice(0, 2)
  const EndTime = BookingData.endTime.slice(0, 2)

  BookingData.payableAmount =
    (Number(EndTime) - Number(startTime)) * isExistsFacility.pricePerHour

  const AddBookingData = await BookingModel.create(BookingData)

  return AddBookingData
}

const GetBookingByUserIdIntoDb = async (userid: string) => {
  const AddBookingData = await BookingModel.find({ user: userid }).populate('facility')

  return AddBookingData
}

const CancleBookingIntoDb = async (id: string) => {
  const DeleteBooking = await BookingModel.findByIdAndUpdate(
    id,
    {
      isBooked: 'canceled',
    },
    { new: true },
  )

  return DeleteBooking
}

export const BookingServices = {
  GetAllBookingIntoDb,
  CreateBokkingIntoDb,
  CancleBookingIntoDb,
  GetBookingByUserIdIntoDb,
}

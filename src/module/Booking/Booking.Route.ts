import express from 'express'
import { BookingController } from './Booking.controller'
import auth from '../../MeddleWare/auth'

const router = express.Router()

router.get('/', auth('admin'), BookingController.GettAllBookings)
router.get('/user', auth('user'), BookingController.GetbookingByUserid)
router.post('/', auth('user'), BookingController.CreateBookings)
router.patch('/:id', auth('user'), BookingController.CancleBooking) 

export const BookingRouter = router

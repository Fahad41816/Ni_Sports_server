import { AvailabilityRoute } from '../module/Availability/availability.route'
import { BookingRouter } from '../module/Booking/Booking.Route'
import { FacilityRoute } from '../module/Facility/Facility.route'
import { UserRoute } from '../module/User/User.route'
import express from 'express'

const Router = express.Router()

const Routers = [
  {
    path: '/auth',
    route: UserRoute,
  },
  {
    path: '/facility',
    route: FacilityRoute,
  },
  {
    path: '/bookings',
    route: BookingRouter,
  },
  {
    path: '/check-availability',
    route: AvailabilityRoute,
  },
]

Routers.map(route => Router.use(route.path, route.route))

export default Router

import express from 'express'
import CheckAvailability from './CheckAvailability'

const Router = express.Router()

Router.get('/', CheckAvailability)

export const AvailabilityRoute = Router

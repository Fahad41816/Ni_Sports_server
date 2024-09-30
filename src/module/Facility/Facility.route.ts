import express from 'express'
import { FacilityController } from './Facility.controller'
import auth from '../../MeddleWare/auth'

const Router = express.Router()

Router.get('/', FacilityController.GetAllFacility)
Router.get('/:id', FacilityController.GetSingleFacility)
Router.post('/', auth('admin'), FacilityController.CreateFacility)
Router.put('/:id', auth('admin'), FacilityController.UpdaatefaclityData)
Router.delete('/:id', auth('admin'), FacilityController.DeleteFacility)

export const FacilityRoute = Router

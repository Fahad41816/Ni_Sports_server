import express from 'express'
import { UserController } from './User.controller'
import ValidationCheck from '../../MeddleWare/ValidationCheck'
import {
  UserLoginValidationWithZod,
  UserValidationWithZod,
} from './User.validation'
import auth from '../../MeddleWare/auth'

const router = express.Router()

router.post(
  '/signup',
  ValidationCheck(UserValidationWithZod),
  UserController.CreateUser,
)

router.post(
  '/CreateAdmin',
  auth('admin'),
  ValidationCheck(UserValidationWithZod),
  UserController.CreateAdmin,
)

router.get(
  '/user/:id', 
  auth('user', 'admin'),
  UserController.GetUser,
)


router.post(
  '/login',
  ValidationCheck(UserLoginValidationWithZod),
  UserController.loginUser,
)

export const UserRoute = router

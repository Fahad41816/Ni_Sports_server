/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose'
import { TUser } from './User.interface'
import bycript from 'bcrypt'
import config from '../../app/config'

const UsetSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
  },
  {
    timestamps: true,
  },
)

UsetSchema.pre('save', async function (next) {
  const user = this

  user.password = await bycript.hash(user.password, Number(config.saltRounds))

  next()
})

export const UserModel = model('user', UsetSchema)

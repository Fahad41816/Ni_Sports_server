import { model, Schema } from 'mongoose'
import { TFacility } from './Facility.interface'

const FacilitySchema = new Schema<TFacility>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    location: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    image: { type: String, required: true }
  },
  {
    timestamps: true,
  },
)

export const FacilityModel = model('Facility', FacilitySchema)

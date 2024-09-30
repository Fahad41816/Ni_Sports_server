import { z } from 'zod'

const BookingValidationWithZod = z.object({
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  facility: z.string(),
  payableAmount: z.string(),
  TranId: z.string(),
  isBooked : z.string()
})

export const BookingValidate = {
  BookingValidationWithZod,
}

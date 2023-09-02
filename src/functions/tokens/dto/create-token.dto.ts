import { z } from "zod";
import * as Validations from "../../../utils/validations";

const errorExpirationYear = 'expiration year format not valid'

export const CreateTokenDtoSchema = z.object({
  card_number: z.number().refine((value) => Validations.isValidCardNumber(value), { message: 'Card number not valid' }),
  cvv: z.number().refine((value) => Validations.isValidCvv(value), { message: 'CVV not valid' }),
  expiration_month: z.string().refine((value) => Validations.isValidExpirationMonth(value), { message: 'Expiration month out of range 1 out of 12' }),
  expiration_year: z.string().min(4, errorExpirationYear).max(4, errorExpirationYear).refine((value) => Validations.isValidExpirationYear(value), { message: 'Expiration year out of range' }),
  email: z.string().email().max(100).refine((value) => Validations.isValidDomainEmail(value), { message: 'Email not valid' })
})

export type CreateTokenDto = z.infer<typeof CreateTokenDtoSchema>
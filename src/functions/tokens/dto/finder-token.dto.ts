import { z } from "zod";

export const FinderTokenDtoSchema = z.object({
  token: z.string().length(16, 'Token not valid')
})

export type FinderTokenDto = z.infer<typeof FinderTokenDtoSchema>
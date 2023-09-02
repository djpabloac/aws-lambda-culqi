import * as Redis from "../../../config/redis";
import { generateToken } from "../../../utils/generate-token";
import { addMinutes } from "../../../utils/date";
import { omitKeys } from "../../../utils/types";
import { CreateTokenDto } from "../dto/create-token.dto";
import { FinderTokenDto } from "../dto/finder-token.dto";
import { getModel, TokenCreate } from "../pg/token.model";
import { TokenResult } from "../entity/token.entity";

const mapToTokenCreate = (rawToken: CreateTokenDto): TokenCreate => {
  const currentDate = new Date()

  return {
    ...rawToken,
    expiration_token: addMinutes(currentDate, Redis.DURATION_FIFTEEN_MINUTES),
    created_at: currentDate,
    token: generateToken(16)
  }
}

export const createToken = async (createTokenDto: CreateTokenDto) => {
  const parseToken = mapToTokenCreate(createTokenDto)

  const TokenModel = await getModel()
  const newToken = await TokenModel.create(parseToken)
  const currentToken = newToken.toJSON()

  const tokenResult: TokenResult = omitKeys(currentToken, ['id', 'cvv', 'created_at', 'token', 'expiration_token'])

  await Redis.set({
    key: currentToken.token,
    value: {
      ...tokenResult,
      card_number: parseInt(tokenResult.card_number?.toString())
    },
    minutes: Redis.DURATION_FIFTEEN_MINUTES
  })

  return {
    token: currentToken.token
  }
}

export const getCreditCardByToken = async (finderToken: FinderTokenDto) => {
  const currentToken = await Redis.get<TokenResult>(finderToken.token)

  if(!currentToken) throw new Error('Token expiration');

  return currentToken
}
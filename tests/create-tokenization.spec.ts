/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { close } from "../src/config/redis";
import { handler as handlerCreateToken } from "../src/functions/tokens/create-token";
import { handler as handlerFinderToken } from "../src/functions/tokens/finder-token";
import { omitKeys } from "../src/utils/types";

const { TOKEN_BEARER } = process.env

const Authorization = `Bearer ${TOKEN_BEARER}`

const creditCard = {
  "email": "test@gmail.com",
  "card_number": 4557880563224611,
  "cvv": 122,
  "expiration_year": "2025",
  "expiration_month": "12"
}

describe('Tokenization', () => {
  let responseCreateToken: APIGatewayProxyResult | null = null
  let parseBodyCreateToken: any | null = null
  let responseFinderToken: APIGatewayProxyResult | null = null
  let parseBodyFinderToken: any | null = null

  beforeAll(async () => {
    const contextCreateToken: Context = {
      functionName: 'createToken'
    } as any

    const eventCreateToken: APIGatewayProxyEvent = {
      body: JSON.stringify(creditCard),
      headers: { Authorization }
    } as any

    responseCreateToken = await handlerCreateToken(eventCreateToken, contextCreateToken, () => { }) as APIGatewayProxyResult

    parseBodyCreateToken = JSON.parse(responseCreateToken.body)

    const contextFinderToken: Context = {
      functionName: 'finderToken'
    } as any

    const eventFinderToken: APIGatewayProxyEvent = {
      pathParameters: { token: parseBodyCreateToken?.data?.token ?? '' },
      headers: { Authorization }
    } as any

    responseFinderToken = await handlerFinderToken(eventFinderToken, contextFinderToken, () => { }) as APIGatewayProxyResult

    parseBodyFinderToken = JSON.parse(responseFinderToken.body)
  })

  describe('1. The token was created correctly?', () => {
    test('statusCode is 200?', () => {
      expect(responseCreateToken?.statusCode).toBe(200)
    })

    test('success is true?', () => {
      expect(parseBodyCreateToken?.success).toEqual(true)
    })

    test('exists prop token?', () => {
      expect(parseBodyCreateToken?.data).toHaveProperty('token')
    })

    test('The prop token size is 16 characters?', () => {
      expect(parseBodyCreateToken?.data?.token?.length).toEqual(16)
    })
  })

  describe('2. There is credit card information', () => {
    test('statusCode is 200?', () => {
      expect(responseFinderToken?.statusCode).toBe(200)
    })

    test('success is true?', () => {
      expect(parseBodyFinderToken?.success).toEqual(true)
    })

    test('have valid data credit card?', () => {
      expect(parseBodyFinderToken?.data).toMatchObject(omitKeys(creditCard, ['cvv']))
    })
  })

  afterAll(async () => {
    await close()
  })
})





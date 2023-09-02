import { APIGatewayProxyHandler } from "aws-lambda";
import { errorHandler } from "../../utils/error-handler";
import { responseHandler } from "../../utils/response-handler";
import { CreateTokenDtoSchema } from "./dto/create-token.dto";
import { createToken } from "./services/token.pg.service";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const creditCardSafe = CreateTokenDtoSchema.safeParse(JSON.parse(event.body ?? ''))

    if (!creditCardSafe.success)
      return errorHandler(creditCardSafe.error)

    const data = await createToken(creditCardSafe.data)

    return responseHandler(data)
  } catch (error) {
    return errorHandler(error)
  }
}
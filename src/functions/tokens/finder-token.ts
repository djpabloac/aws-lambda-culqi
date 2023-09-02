import { APIGatewayProxyHandler } from "aws-lambda";
import { errorHandler } from "../../utils/error-handler";
import { responseHandler } from "../../utils/response-handler";
import { FinderTokenDtoSchema } from "./dto/finder-token.dto";
import { getCreditCardByToken } from "./services/token.pg.service";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const tokenSafe = FinderTokenDtoSchema.safeParse(event.pathParameters)

    if (!tokenSafe.success)
      return errorHandler(tokenSafe.error)

    const data = await getCreditCardByToken(tokenSafe.data)

    return responseHandler(data)
  } catch (error) {
    return errorHandler(error)
  }
}
import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import PRODUCTS from "../mock/products.json";
import { DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS, RESPONSE_STATUS_CODES }  from "../common"

export const getProductsList = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

  return {
    statusCode: RESPONSE_STATUS_CODES.OK,
    headers: {
      ...DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS
    },
    body: JSON.stringify(PRODUCTS)
  };
};
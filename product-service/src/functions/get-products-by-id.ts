import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import  PRODUCTS  from "../mock/products.json";
import { DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS, RESPONSE_STATUS_CODES }  from "../common"

export const getProductsById = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

  const product = PRODUCTS.filter((product) => {
    return product.id === event.pathParameters?.productId
  })

  if (!product || !product.length) {
    return {
      statusCode: RESPONSE_STATUS_CODES.NOT_FOUND,
      headers: {
        ...DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS
      },
      body: JSON.stringify({
        message: 'Product not found.'
      }),
    }
  }

  return {
    statusCode: RESPONSE_STATUS_CODES.OK,
    headers: {
      ...DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS
    },
    body: JSON.stringify(product),
  };
};
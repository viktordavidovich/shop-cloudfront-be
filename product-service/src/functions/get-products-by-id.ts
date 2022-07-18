import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import PRODUCTS from "../mock/products.json";

export const getProductsById = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

  const product = PRODUCTS.filter((product) => {
    return product.id === event.pathParameters?.productId
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/json"
    },
    body: JSON.stringify(product),
  };
};
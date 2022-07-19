import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import PRODUCTS from "../mock/products.json";

export const getProductsList = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/json"
    },
    body: JSON.stringify(PRODUCTS),
  };
};
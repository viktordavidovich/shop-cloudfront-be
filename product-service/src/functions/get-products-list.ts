import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { QueryResult } from "pg";
import { db, DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS, RESPONSE_STATUS_CODES } from "../common"
import { Products } from '../@types/api-types';

export const getProductsList = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context)}`);

  try {
    const client = db()
    await client.connect();

    try {
      const { rows: products }: QueryResult<Products> = await client.query(
        `SELECT products.*, stocks.count FROM products LEFT JOIN stocks ON products.id=stocks.product_id`
      )

      return {
        statusCode: RESPONSE_STATUS_CODES.OK,
        headers: {
          ...DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS
        },
        body: JSON.stringify(products)
      };

    } catch (e) {

      return {
        statusCode: RESPONSE_STATUS_CODES.INTERNAL_SERVER_ERROR,
        headers: {
          ...DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS
        },
        body: JSON.stringify({
          message: `ERROR WHEN QUERY PRODUCTS FROM DB: ${JSON.stringify(e)}`
        })
      };

    } finally {
      await client.end();
    }


  } catch (e) {

    return {
      statusCode: RESPONSE_STATUS_CODES.INTERNAL_SERVER_ERROR,
      headers: {
        ...DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS
      },
      body: JSON.stringify({
        message: `DB CONNECTION ERROR ${JSON.stringify(e)}`
      })
    };
  }

};
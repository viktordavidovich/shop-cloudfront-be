import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { db, DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS, RESPONSE_STATUS_CODES } from "../common"

export const getProductsById = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult | undefined> => {

  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context)}`);

  try {
    const client = db()
    await client.connect();

    try {
      const id = event.pathParameters?.productId;
      const selectResult = await client.query('select products.*, stocks.count from products left join stocks on products.id=stocks.product_id WHERE products.id=$1', [id]);
      console.log(`selectResult`, selectResult);
      const product = selectResult.rows.length && selectResult.rows[0];
      console.log(`product`, product);

      if (!product) {
        return {
          statusCode: RESPONSE_STATUS_CODES.NOT_FOUND,
          headers: {
            ...DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS
          },
          body: JSON.stringify({
            message: 'Product not found.'
          })
        }
      }

      return {
        statusCode: RESPONSE_STATUS_CODES.OK,
        headers: {
          ...DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS
        },
        body: JSON.stringify(product)
      };
    } catch (e) {
      return {
        statusCode: RESPONSE_STATUS_CODES.INTERNAL_SERVER_ERROR,
        headers: {
          ...DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS
        },
        body: JSON.stringify({
          message: `DB QUERY REQUEST ERROR ${JSON.stringify(e)}`
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
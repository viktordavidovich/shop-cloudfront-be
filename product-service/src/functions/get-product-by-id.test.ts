import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { getProductsById } from "./get-products-by-id";
import PRODUCTS from "../mock/products.json";

describe('getProductsById function', function () {
  test('should return successful response', async () => {
    const productId = PRODUCTS[0].id;
    const product = PRODUCTS[0];
    const event = {
      pathParameters: {
        productId: productId
      }
    } as unknown as APIGatewayProxyEvent
    const context = {

    } as Context

    const result = await getProductsById(event, context)

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(`${JSON.stringify([product])}`);
  });

  test('should return 404 if product not found', async () => {
    const productId = "1";
    const error = {
      message: "Product not found."
    }
    const event = {
      pathParameters: {
        productId: productId
      }
    } as unknown as APIGatewayProxyEvent
    const context = {

    } as Context

    const result = await getProductsById(event, context)

    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual(`${JSON.stringify(error)}`);
  });
});
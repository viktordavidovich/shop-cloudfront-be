import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { getProductsList } from "./get-products-list";
import PRODUCTS from "../mock/products.json";
import { RESPONSE_STATUS_CODES } from '../common';

describe('getProductsList function', function () {
  test('should return successful response', async () => {
    const products = PRODUCTS;
    const event = {

    } as APIGatewayProxyEvent
    const context = {

    } as Context

    const result = await getProductsList(event, context)

    expect(result.statusCode).toEqual(RESPONSE_STATUS_CODES.OK);
    expect(result.body).toEqual(`${JSON.stringify(products)}`);
  });
});
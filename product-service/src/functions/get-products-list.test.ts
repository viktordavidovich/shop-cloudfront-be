import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { getProductsById } from "./get-products-by-id";
import { Product } from '../@types/api-types';
import { RESPONSE_STATUS_CODES } from '../common';

const products: Product[] = [{
  id: "0d308af6-1a39-4600-bc85-af0a9c409cec",
  title: "Product title",
  description: "Product description",
  price: 10,
  count: 1
}, {
  id: "0d308af6-1a39-4600-bc85-af0a9c409cec",
  title: "Product title",
  description: "Product description",
  price: 10,
  count: 1
}]

jest.mock('../common', () => {
  const originalModule = jest.requireActual('../common');
  const mClient = {
    connect: jest.fn().mockResolvedValue(''),
    query: jest.fn().mockResolvedValue({rows: [products]}),
    end: jest.fn().mockResolvedValue('')
  };
  return {
    ...originalModule,
    __esModule: true,
    db: jest.fn(() => mClient)
  };
});

describe('getProductsList function', function () {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return successful response with products', async () => {
    const event = {} as unknown as APIGatewayProxyEvent
    const context = {} as Context

    const result = await getProductsById(event, context)

    expect(result.statusCode).toEqual(RESPONSE_STATUS_CODES.OK);
    expect(result.body).toEqual(`${JSON.stringify(products)}`);
  });

});




import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { getProductsById } from "./get-products-by-id";
import { Product } from '../@types/api-types';
import { RESPONSE_STATUS_CODES } from '../common';

const product: Product = {
  id: "0d308af6-1a39-4600-bc85-af0a9c409cec",
  title: "Product title",
  description: "Product description",
  price: 10,
  count: 1
}

jest.mock('../common', () => {
  const originalModule = jest.requireActual('../common');
  const mClient = {
    connect: jest.fn().mockResolvedValue(''),
    query: jest.fn().mockResolvedValue({ rows: [product]}),
    end: jest.fn().mockResolvedValue('')
  };
  return {
    ...originalModule,
    __esModule: true,
    db: jest.fn(() => mClient)
  };
});

describe('getProductsById function', function () {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return successful response', async () => {
    const event = {
      pathParameters: {
        productId: product.id
      }
    } as unknown as APIGatewayProxyEvent
    const context = {

    } as Context

    const result = await getProductsById(event, context)

    expect(result.statusCode).toEqual(RESPONSE_STATUS_CODES.OK);
    expect(result.body).toEqual(`${JSON.stringify(product)}`);
  });

});




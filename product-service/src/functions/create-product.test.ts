import { createProduct } from './create-product';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { RESPONSE_STATUS_CODES } from '../common';
import { CreateProduct } from '../@types/api-types';
import { Pool } from 'pg';

const id = "0d308af6-1a39-4600-bc85-af0a9c409cec";

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn().mockResolvedValue({
        query: jest.fn()
          .mockResolvedValue('')
          .mockResolvedValueOnce('')
          .mockResolvedValueOnce({rows: [{ id }]}),
        release: jest.fn().mockResolvedValue('')
    }),
    on: jest.fn()
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('createProduct function', () => {
  let pool;

  beforeEach(() => {
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  test('should return successful response if product has been created', async () => {
    const product: CreateProduct = {
      title: "Product title",
      description: "Product description",
      price: 100,
      count: 10,
    }

    const event = {
      body: JSON.stringify(product)
    } as unknown as APIGatewayProxyEvent
    const context = {} as Context

    const result = await createProduct(event, context)

    expect(result.statusCode).toEqual(RESPONSE_STATUS_CODES.CREATED);
    expect(result.body).toEqual(JSON.stringify(Object.assign({id}, product)));
  });

});
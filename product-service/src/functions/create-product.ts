import { db, DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS, RESPONSE_STATUS_CODES } from "../common";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Pool } from "pg";
import { DB_OPTIONS } from '../common/db/connection';
import { Product } from '../@types/api-types';

const pool = new Pool(DB_OPTIONS);

export const createProduct = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context)}`);

  const { title, description = '', price, count } = JSON.parse(event.body as string);

  try {
    const client = await pool.connect();

    pool.on('error', (e, client)=> {
      throw new Error(JSON.stringify({ message: 'DB POOL PRODUCE EMITTED ERROR EVENT', error: e, client }))
    })

    try {
      await client.query('BEGIN')
      let id: string;
      try {
        const insertResult = await client.query('insert into products (title, description, price)  values ($1, $2, $3) returning id', [title, description, price]);
        id = insertResult.rows.length && insertResult.rows[0]?.id;
      } catch (e) {
        await client.query('ROLLBACK')
        return {
          statusCode: RESPONSE_STATUS_CODES.BAD_REQUEST,
          headers: {
            ...DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS
          },
          body: JSON.stringify({
            message: `Product data is invalid.`
          })
        };
      }

      try {
        await client.query("insert into stocks (product_id, count) values ($1, $2)", [id, count]);
        await client.query('COMMIT')
      } catch (e) {
        await client.query('ROLLBACK')
        return {
          statusCode: RESPONSE_STATUS_CODES.BAD_REQUEST,
          headers: {
            ...DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS
          },
          body: JSON.stringify({
            message: `Product data is invalid.`
          })
        };
      }

      return {
        statusCode: RESPONSE_STATUS_CODES.CREATED,
        headers: {
          ...DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS
        },
        body: JSON.stringify({
          id,
          title,
          description,
          price,
          count
        } as Product)
      };

    } catch (e) {
      await client.query('ROLLBACK')

      return {
        statusCode: RESPONSE_STATUS_CODES.INTERNAL_SERVER_ERROR,
        headers: {
          ...DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS
        },
        body: JSON.stringify({
          message: `DB QUERY ERROR ${JSON.stringify(e)}`
        })
      };

    } finally {
      await client.release();
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
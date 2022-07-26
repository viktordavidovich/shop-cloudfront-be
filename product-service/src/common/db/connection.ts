import { Client, ClientConfig } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const port = parseInt(PG_PORT as string,10)

export const DB_OPTIONS: ClientConfig = {
  host: PG_HOST,
  port,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 10000
}

export const db = () => {
  return new Client(DB_OPTIONS);
}


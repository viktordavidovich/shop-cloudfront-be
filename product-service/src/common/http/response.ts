export const DEFAULT_AWS_GATEWAY_API_RESPONSE_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "content-type": "application/json"
}

export enum RESPONSE_STATUS_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}
## Product Service API

To run unit tests use the following command: 

```
npm run test
```

Product Service Domain URL:
- https://0g62az8mnf.execute-api.us-east-1.amazonaws.com


| APIs                       | Example URL                                                                                                                                                             | Description                                           |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| GET `/products`            | [/products](https://0g62az8mnf.execute-api.us-east-1.amazonaws.com/products)                                                                                            | Returns full array of products (mock data is used).   |
| GET `/products/:productId` | [/products/:productId](https://0g62az8mnf.execute-api.us-east-1.amazonaws.com/products/7567ec4b-b10c-48c5-9345-fc73c48a80a0)   | Returns 1 searched product from an array of products. |


URL on Pull Request with update SPA:
- https://github.com/viktordavidovich/shop-angular-cloudfront/pull/2

Swagger URL:
- https://0g62az8mnf.execute-api.us-east-1.amazonaws.com/swagger

Product Schema Example:
```json
{
  "count": 4,
  "description": "Short Product #1 Description",
  "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
  "price": 2.4,
  "title": "Product #1"
}
```
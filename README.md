# How to execute API
1. Create a _.env_ file at root level with the following environment variables:
```
CLIENT_ID = <CLIENT_ID>
CLIENT_SECRET = <CLIENT_SECRET>
BASE_API_URL = https://dare-nodejs-assessment.herokuapp.com/api
AUTH_SECRET = <AUTH_SECRET>
AUTH_EXPIRES_IN = 86400
```
2. Execute `npm i` and `npm start` command to create a Fastify server on port 3000
3. Go to Postman -> Import -> Link and paste this [link](https://www.getpostman.com/collections/c698b33ebc16bfdd4b4a)
4. Execute **Login** request to obtain the required token to authenticate and use it in the header for /clients and /policies API. This should be generated automatically thanks to the Postman collection script made within /login execution. You should include the following payload:
```json
{
  "username": "<ANY-USER>",
  "password": "<ANY-PASSWORD>"
}
```
5. Execute the rest of the endpoints for both /clients and /policies APIs

# How to test
1. Execute `npm test`

# Not included
## Authorization
In order to avoid further delays to deliver the REST API, authorization was left aside. This means that the endpoints do not have user restrictions and 403 error validations.
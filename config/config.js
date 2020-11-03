/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  base_api_url: process.env.BASE_API_URL,
  secret: process.env.AUTH_SECRET,
  expires_in: process.env.AUTH_EXPIRES_IN,
  jwt_enabled: process.env.JWT_ENABLED != 'false'
};
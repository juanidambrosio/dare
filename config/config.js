/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  base_api_url: process.env.BASE_API_URL,
  authprovider: {
    domain: process.env.BASE_API_AUTH_DOMAIN,
    client_secret: process.env.AUTH_CLIENT_SECRET
  },
  jwt_enabled: process.env.JWT_ENABLED || true
};
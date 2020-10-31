const axios = require('axios');
const config = require('../config/config');
const { mapAuthResponse } = require('../helpers/normalizer');

let instance;

const createInstance = () => {
  instance = axios.create({
    baseURL: config.authprovider.domain,
    timeout: 5000
  });
};

const login = async credentials => {
  const { client_id, client_secret, audience, grant_type} = credentials;

  const { data } = await instance.post('/oauth/token',
    {
      client_id,
      client_secret,
      audience,
      grant_type
    });
  return data ? mapAuthResponse(data) : createError(401);
};

module.exports = {
  login,
  createInstance
};
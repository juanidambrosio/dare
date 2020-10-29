/* eslint-disable no-unsafe-finally */
const axios = require('axios');
const config = require('../config/config');
const { createError } = require('../helpers/error');

let instance;

const createInstance = () => {
  instance = axios.create({
    baseURL: config.base_api_url,
    timeout: 5000
  });
};

const executeEndpoint = async (endpointFn, retries = 3) => {
  let token, response;
  try {
    response = await endpointFn();
  }
  catch (error) {
    if (error.response.status === 401) {
      token = await login();
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
  finally {
    if (response) {
      return response;
    }
    else if (!response && retries > 0){
      return await executeEndpoint(endpointFn, retries - 1);
    }
    else createError(401);
  }
};

const login = async () => {
  const { data } = await instance.post('/login',
    {
      client_id: config.client_id,
      client_secret: config.client_secret
    });
  return data ? data.token : undefined;
};

const getPolicies = async () => {
  return await instance.get('/policies');
};

module.exports = {
  createInstance,
  executeEndpoint,
  getPolicies
};
/* eslint-disable no-unsafe-finally */
const axios = require('axios');
const config = require('../config/config');

let instance;

const createInstance = () => {
  instance = axios.create({
    baseURL: config.base_api_url,
    timeout: 5000
  });
};

const executeEndpoint = async (endpointFn, params, retries = 3) => {
  let token, response;
  try {
    response = await endpointFn(params);
  }
  catch (error) {
    if (error.response.status === 401) {
      token = await login();
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else if (retries === 0) {
      throw {
        statusCode: 403,
        error: 'Forbidden',
        message: 'Could not access to Insurance API'
      };
    }
  }
  finally {
    if (!response && retries > 0){
      return await executeEndpoint(endpointFn, params, retries - 1);
    }
    else if (response) {
      return response;
    }
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
  login,
  getPolicies,
  executeEndpoint
};
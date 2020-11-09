/* eslint-disable no-unsafe-finally */
const axios = require('axios');
const config = require('../config/config');
const { createError } = require('../helpers/error');
const { mapClients } = require('../helpers/normalizer');

let instance;

createInstance = () => {
  instance = !instance ? axios.create({
    baseURL: config.base_api_url,
    timeout: 5000
  }) : instance;
};

const executeEndpoint = async (endpointFn, retries = 3) => {
  try {
    return await endpointFn();
  }
  catch (error) {
    if (error.response.status === 401) {
      const token = await login();
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
  if (retries > 0) {
    return await executeEndpoint(endpointFn, retries - 1);
  }
  createError(401);
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
  const { data, headers } = await instance.get('/policies');
  return {
    items: data,
    expires: getExpirationDate(
      headers.date,
      headers.expires
    )};
};

const getClients = async () => {
  const { data, headers } = await instance.get('/clients');
  const { data: policiesData } = await instance.get('/policies');
  const mappedClients = mapClients(data, policiesData);
  return {
    items: mappedClients,
    expires: getExpirationDate(
      headers.date,
      headers.expires
    )};
};

const getExpirationDate = (requestedDate, expirationDate) => {
  return (
    (new Date(expirationDate).getTime() -
    new Date(requestedDate).getTime()) / 1000
  );
};

createInstance();

module.exports = {
  getPolicies: () => executeEndpoint(getPolicies),
  getClients: () => executeEndpoint(getClients)
};
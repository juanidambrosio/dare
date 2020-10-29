const { createError } = require('../helpers/error');
const { removeProperties } = require('../helpers/normalizer');
const {
  saveInCache,
  getByIdFromCache,
  getAllFromCache
} = require('../storage/cache');
const _ = require('lodash');

const getClientById = insuranceClient => async (id) => {
  let item = getByIdFromCache(id, 'c');
  if (item) {
    return mapClients([item]);
  }
  else {
    const items = await insuranceClient.executeEndpoint(
      insuranceClient.getClients
    );
    item = items.find(item => item.id === id);
    saveInCache(items, 'c');
    return item ? mapClients([item]) : createError(404);
  }
};

const getClients = insuranceClient => async () => {
  let items = getAllFromCache('c');
  if (_.isEmpty(items)) {
    items = await insuranceClient.executeEndpoint(
      insuranceClient.getClients
    );
    saveInCache(items, 'c');
  }
  return mapClients(items);
};

const getClientPolicies = insuranceClient => async id => {
  let item = getByIdFromCache(id, 'c');
  if (item) {
    return mapClientPolicies(item);
  }
  else {
    const items = await insuranceClient.executeEndpoint(
      insuranceClient.getClients
    );
    item = items.find(item => item.id === id);
    saveInCache(items, 'c');
    return item ? mapClientPolicies(item) : createError(404);
  }
};

const mapClients = items => {
  return items.map(item => {
    return {
      ...item,
      policies: removeProperties(
        item.policies,
        ['email', 'installmentPayment', 'clientId']
      )
    };});
};

const mapClientPolicies = item => {
  return removeProperties(item.policies, ['clientId']);
};

module.exports = insuranceClient => {
  return {
    getClientById: getClientById(insuranceClient),
    getClients: getClients(insuranceClient),
    getClientPolicies: getClientPolicies(insuranceClient)
  };
};
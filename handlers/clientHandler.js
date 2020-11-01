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

const getClients = insuranceClient => async query => {

  let items = getAllFromCache('c', query);
  if (_.isEmpty(items)) {
    items = await insuranceClient.executeEndpoint(
      insuranceClient.getClients
    );
    saveInCache(items, 'c');
  }
  const paginatedClients = applyFilters(items, query);
  return mapClients(paginatedClients);
};

const applyFilters = (items, query) => {
  const { limit, name } = query;
  const itemsAfterNameFilter = name ?
    items.filter(item => item.name === name) :
    items;

  return itemsAfterNameFilter.slice(0, limit);
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
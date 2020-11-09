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
  if (!item) {
    const clients = await insuranceClient.getClients();
    item = clients.items.find(item => item.id === id);
    saveInCache(clients, 'c');
  }
  return item ? mapClients([item]) : createError(404);
};

const getClients = insuranceClient => async query => {
  let items = getAllFromCache('c');
  if (_.isEmpty(items)) {
    const clients = await insuranceClient.getClients();
    items = clients.items;
    saveInCache(clients, 'c');
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

const getClientPolicies = insuranceClient => async id => {
  let item = getByIdFromCache(id, 'c');
  if (!item) {
    const clients = await insuranceClient.getClients();
    items = clients.items;
    item = items.find(item => item.id === id);
    saveInCache(clients, 'c');
  }
  return item ? mapClientPolicies(item) : createError(404);
};

const mapClients = items => {
  return items.map(item => {
    return {
      ...item,
      policies: removeProperties(
        item.policies,
        ['email', 'installmentPayment', 'clientId']
      )
    };
  });
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
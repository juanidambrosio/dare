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
    return mapItems([item]);
  }
  else {
    const items = await insuranceClient.executeEndpoint(
      insuranceClient.getClients
    );
    item = items.find(item => item.id === id);
    saveInCache(items, 'c');
    return item ? mapItems([item]) : createError(404);
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
  return mapItems(items);
};

const mapItems = items => {
  return items.map(item => {
    return {
      ...item,
      policies: removeProperties(
        item.policies,
        ['email', 'installmentPayment', 'clientId']
      )
    };});
};

module.exports = insuranceClient => {
  return {
    getClientById: getClientById(insuranceClient),
    getClients: getClients(insuranceClient)
  };
};
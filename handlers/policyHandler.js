const { createError } = require('../helpers/error');
const { removeProperties } = require('../helpers/normalizer');
const {
  saveInCache,
  getByIdFromCache,
  getAllFromCache
} = require('../storage/cache');
const _ = require('lodash');

const getPolicyById = insuranceClient => async (id) => {
  let item = getByIdFromCache(id, 'p');
  if (!item) {
    const policies = await insuranceClient.getPolicies();
    const items = policies.items;
    item = items.find(item => item.id === id);
    saveInCache(policies, 'p');
  }
  return item ? removeProperties([item], ['clientId']) : createError(404);
};

const getPolicies = insuranceClient => async query => {
  let items = getAllFromCache('p');
  if (_.isEmpty(items)) {
    const policies = await insuranceClient.getPolicies();
    items = policies.items;
    saveInCache(policies, 'p');
  }
  const paginatedPolicies = items.slice(0, query.limit);
  return removeProperties(paginatedPolicies, ['clientId']);
};

module.exports = insuranceClient => {
  return {
    getPolicyById: getPolicyById(insuranceClient),
    getPolicies: getPolicies(insuranceClient)
  };
};
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
  if (item) {
    return removeProperties([item], ['clientId']);
  }
  else {
    const { data } = await insuranceClient.executeEndpoint(
      insuranceClient.getPolicies
    );
    item = data.find(item => item.id === id);
    saveInCache(data, 'p');
    return item ? removeProperties([item], ['clientId']) : createError(404);
  }
};

const getPolicies = insuranceClient => async query => {
  let items = getAllFromCache('p');
  if (_.isEmpty(items)) {
    items = await insuranceClient.executeEndpoint(
      insuranceClient.getPolicies
    );
    saveInCache(items, 'p');
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
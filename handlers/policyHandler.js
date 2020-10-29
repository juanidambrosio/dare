const { createError } = require('../helpers/error');
const {
  saveInCache,
  getByIdFromCache,
  getAllFromCache
} = require('../storage/cache');
const _ = require('lodash');

const getPolicyById = insuranceClient => async (id) => {
  let item = getByIdFromCache(id, 'p');
  if (item) {
    return removeClientId(item);
  }
  else {
    const { data } = await insuranceClient.executeEndpoint(
      insuranceClient.getPolicies
    );
    item = data.find(item => item.id === id);
    saveInCache(data, 'p');
    return item ? removeClientId(item) : createError(404);
  }
};

const getPolicies = insuranceClient => async () => {
  const items = getAllFromCache('p');
  if (_.isEmpty(items)) {
    const { data } = await insuranceClient.executeEndpoint(
      insuranceClient.getPolicies
    );
    saveInCache(data, 'p');
    return removeClientIdItems(data);
  }
  else return removeClientIdItems(items);
};

const removeClientIdItems = items => {
  return items.map(item => removeClientId(item));
};

const removeClientId = item => {
  return { ..._.omit(item, ['clientId']) };
};
module.exports = insuranceClient => {
  return {
    getPolicyById: getPolicyById(insuranceClient),
    getPolicies: getPolicies(insuranceClient)
  };
};
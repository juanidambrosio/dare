
const _ = require('lodash');

const removeProperties = (items, properties) => {
  return items.map(item => removePropertiesItem(item, properties));
};

const removePropertiesItem = (item, properties) => {
  return { ..._.omit(item, properties) };
};

const mapClients = (clients, policies) => {
  return clients.map(client =>
  {
    return {
      ...client,
      policies: policies.filter(policy => policy.clientId === client.id)
    };
  });
};

module.exports = {
  removeProperties,
  mapClients
};
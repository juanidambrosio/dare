
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

const mapAuthResponse = authResponse => {
  return {
    token: authResponse.access_token,
    type: authResponse.token_type,
    expires_in: authResponse.expires_in
  };
};

module.exports = {
  removeProperties,
  mapClients,
  mapAuthResponse
};
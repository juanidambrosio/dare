const policies = [
  {
    id: '1',
    clientId: 'c1'
  },
  {
    id: '2',
    clientId: 'c2'
  }

];

const clients = [
  {
    id: 'c1',
    name: 'Kate',
    email: 'kate@company.com'
  },
  {
    id: 'c2',
    name: 'Britney',
    email: 'britney@company.com'
  }
];

const normalizedPolicies = [
  {
    id: '1'
  },
  {
    id: '2'
  }
];

const normalizedClients = [
  {
    id: 'c1',
    name: 'Kate',
    email: 'kate@company.com',
    policies: [
      {
        id: '1',
        clientId: 'c1'
      }
    ]
  },
  {
    id: 'c2',
    name: 'Britney',
    email: 'britney@company.com',
    policies: [
      {
        id: '2',
        clientId: 'c2'
      }
    ]
  }
];

const authResponse = {
  access_token: '123456',
  token_type: 'Bearer',
  expires_in: 86400
};

const normalizedAuthResponse = {
  token: '123456',
  type: 'Bearer',
  expires_in: 86400
};

module.exports = {
  policies,
  clients,
  normalizedPolicies,
  normalizedClients,
  authResponse,
  normalizedAuthResponse
};
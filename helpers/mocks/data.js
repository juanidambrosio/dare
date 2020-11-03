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

module.exports = {
  policies,
  clients,
  normalizedPolicies,
  normalizedClients
};
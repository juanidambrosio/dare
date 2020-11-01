const clients = [
  {
    id: '1',
    name: 'Kate',
    role: 'user',
    policies: [
      {
        id: 'p1',
        email: 'a@a.com',
        installmentPayment: 'installment payment',
        amountInsured: '100',
        clientId: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'Juan',
    role: 'user',
    policies: [
      {
        id: 'p2',
        email: 'b@b.com',
        installmentPayment: 'installment payment',
        amountInsured: '100',
        clientId: '2'
      }
    ]
  },
  {
    id: '3',
    name: 'Marcos',
    role: 'user',
    policies: [
      {
        id: 'p3',
        email: 'c@c.com',
        installmentPayment: 'installment payment',
        amountInsured: '100',
        clientId: '1'
      }
    ]
  }
];

const mappedClients = [
  {
    id: '1',
    name: 'Kate',
    role: 'user',
    policies: [
      {
        id: 'p1',
        amountInsured: '100'
      }
    ]
  },
  {
    id: '2',
    name: 'Juan',
    role: 'user',
    policies: [
      {
        id: 'p2',
        amountInsured: '100'
      }
    ]
  },
  {
    id: '3',
    name: 'Marcos',
    role: 'user',
    policies: [
      {
        id: 'p3',
        amountInsured: '100'
      }
    ]
  }
];

const mappedClientId1 = [
  {
    id: '1',
    name: 'Kate',
    role: 'user',
    policies: [
      {
        id: 'p1',
        amountInsured: '100'
      }
    ]
  }
];

const policies = [
  {
    id: 'p1',
    email: 'a@a.com',
    installmentPayment: 'installment payment',
    amountInsured: '100',
    clientId: '1'
  },
  {
    id: 'p2',
    email: 'b@b.com',
    installmentPayment: 'installment payment',
    amountInsured: '100',
    clientId: '2'
  },
  {
    id: 'p3',
    email: 'c@c.com',
    installmentPayment: 'installment payment',
    amountInsured: '100',
    clientId: '1'
  }
];

const mappedPoliciesId1 = [
  {
    id: 'p1',
    email: 'a@a.com',
    installmentPayment: 'installment payment',
    amountInsured: '100'
  }
];

const queryString = {
  name: 'Kate',
  limit: 10
};

module.exports = {
  clients,
  mappedClients,
  mappedClientId1,
  policies,
  mappedPoliciesId1,
  queryString
};
const clients = [
  {
    id: '1',
    name: 'Kate',
    role: 'user',
    policies: [
      {
        id: 'p1',
        email: 'a@a.com',
        installmentpayments: 'installment payment',
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
  }
];

module.exports = {
  clients,
  mappedClients
};
const sut = require('./normalizer');

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

const mappedPolicies = [
  {
    id: '1'
  },
  {
    id: '2'
  }
];

describe('normalizer should', () => {
  test('remove properties from policies', async () => {
    const result = sut.removeProperties(policies, ['clientId']);
    expect(result).toMatchObject(mappedPolicies);
  });
});
const {
  clients,
  policies,
  normalizedClients,
  normalizedPolicies,
  authResponse,
  normalizedAuthResponse
} = require('./mocks/data');

const sut = require('./normalizer');

describe('normalizer should', () => {
  test('remove properties from policies', async () => {
    const result = sut.removeProperties(policies, ['clientId']);
    expect(result).toMatchObject(normalizedPolicies);
  });

  test('map clients with its policies', () => {
    const result = sut.mapClients(clients, policies);
    expect(result).toMatchObject(normalizedClients);
  });

  test('map auth response', () => {
    const result = sut.mapAuthResponse(authResponse);
    expect(result).toMatchObject(normalizedAuthResponse);
  });
});
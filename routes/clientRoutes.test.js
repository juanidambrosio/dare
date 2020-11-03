const {
  getClients,
  getClientId,
  getClientIdPolicies
} = require('./mocks/server');
const {
  clients,
  mappedClientId1,
  mappedClients,
  mappedPoliciesId1
} = require('../mocks/data');
const buildServer = require('../buildServer');
const config = require('../config/config');

const mockInsuranceClient = {
  executeEndpoint: jest.fn(),
  createInstance: jest.fn()
};

jest.mock('../services/insuranceClient', () => mockInsuranceClient);

describe('client routes should', () => {
  let fastify;

  beforeAll(() => {
    fastify = buildServer();
    config.jwt_enabled = false;
    return fastify.ready();
  });

  afterAll(() => fastify.close());

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('return status code 200 while getting clients', async () => {
    mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(clients);
    const { statusCode, response } = await getClients(fastify);
    expect(statusCode).toBe(200);
    expect(response).toEqual(mappedClients);
  });

  test('return status code 200 while getting client by id', async () => {
    mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(clients);
    const { statusCode, response } = await getClientId(fastify)('1');
    expect(statusCode).toBe(200);
    expect(response).toEqual(mappedClientId1);
  });

  test('return status code 404 while getting client by id', async () => {
    mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(clients);
    const { statusCode, response } = await getClientId(fastify)('10');
    expect(statusCode).toBe(404);
    expect(response).toEqual({ code: 404, error: 'Not Found!' });
  });

  test('return status code 200 while getting client policies', async () => {
    mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(clients);
    const { statusCode, response } = await getClientIdPolicies(fastify)('1');
    expect(statusCode).toBe(200);
    expect(response).toEqual(mappedPoliciesId1);
  });

  test('return status code 404 while getting client policies', async () => {
    mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(clients);
    const { statusCode, response } = await getClientIdPolicies(fastify)('10');
    expect(statusCode).toBe(404);
    expect(response).toEqual({ code: 404, error: 'Not Found!' });
  });
});
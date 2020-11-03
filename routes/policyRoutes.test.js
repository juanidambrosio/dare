const {
  getPolicies,
  getPolicyId
} = require('./mocks/server');
const {
  policies,
  mappedPolicies,
  mappedPoliciesId1
} = require('../mocks/data');
const buildServer = require('../buildServer');
const config = require('../config/config');

const mockInsuranceClient = {
  executeEndpoint: jest.fn(),
  createInstance: jest.fn()
};

jest.mock('../services/insuranceClient', () => mockInsuranceClient);

describe('policy routes should', () => {
  let fastify;

  beforeAll(() => {
    fastify = buildServer();
    config.jwt_enabled = false;
    return fastify.ready();
  });

  afterAll(() => fastify.close());

  test('return status code 200 while getting policies', async () => {
    mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(policies);
    const { statusCode, response } = await getPolicies(fastify);
    expect(statusCode).toBe(200);
    expect(response).toEqual(mappedPolicies);
  });

  test('return status code 200 while getting policy by id', async () => {
    mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(policies);
    const { statusCode, response } = await getPolicyId(fastify)('p1');
    expect(statusCode).toBe(200);
    expect(response).toEqual(mappedPoliciesId1);
  });

  test('return status code 404 while getting policy by id', async () => {
    mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(policies);
    const { statusCode, response } = await getPolicyId(fastify)('p5');
    expect(statusCode).toBe(404);
    expect(response).toEqual({ code: 404, error: 'Not Found!' });
  });
});
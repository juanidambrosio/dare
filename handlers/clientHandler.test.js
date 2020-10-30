/* eslint-disable jest/valid-expect */
const { clients, mappedClients } = require('./mocks/data');

describe('client handler should', () => {

  const mockCache = {
    saveInCache: jest.fn(),
    getByIdFromCache: jest.fn(),
    getAllFromCache: jest.fn()
  };

  const mockInsuranceClient = {
    executeEndpoint: jest.fn()
  };

  const sut = require('./clientHandler')(mockInsuranceClient);

  afterEach(() => {
    jest.clearAllMocks();
  });

  jest.mock('../storage/cache', () => mockCache);
  jest.mock('../services/insuranceClient', () => mockInsuranceClient);

  test('return clients from external api and save them in cache', async () => {
    mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(clients);
    const response = await sut.getClients();
    expect(mockCache.getAllFromCache).toHaveBeenCalled();
    expect(mockCache.saveInCache).toHaveBeenCalledWith(clients, 'c');
    expect(response).toMatchObject(mappedClients);
  });
});
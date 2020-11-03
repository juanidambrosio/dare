/* eslint-disable max-len */
const {
  clients,
  mappedClients,
  mappedClientId1,
  mappedPoliciesId1,
  queryString
} = require('../mocks/data');
const _ = require('lodash');

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

  describe('verify for getClients function', () => {
    test('returns clients from external api filtered by name and save all in cache', async () => {
      mockCache.getAllFromCache.mockReturnValueOnce([]);
      mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(clients);
      const response = await sut.getClients(queryString);
      expect(mockCache.getAllFromCache).toHaveBeenCalledWith('c');
      expect(mockCache.saveInCache).toHaveBeenCalledWith(clients, 'c');
      expect(response).toEqual(mappedClientId1);
    });

    test('returns clients from external api filtered with limit and save all in cache', async () => {
      mockCache.getAllFromCache.mockReturnValueOnce([]);
      mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(clients);
      const response = await sut.getClients({ limit: 2 });
      expect(mockCache.getAllFromCache).toHaveBeenCalledWith('c');
      expect(mockCache.saveInCache).toHaveBeenCalledWith(clients, 'c');
      expect(response).toEqual([ ..._.take(mappedClients, 2) ]);
    });

    test('returns clients from cache', async () => {
      mockCache.getAllFromCache.mockReturnValueOnce(clients);
      const responseCache = await sut.getClients({ limit: 10 });
      expect(mockCache.getAllFromCache).toHaveBeenCalledWith('c');
      expect(mockInsuranceClient.executeEndpoint).not.toHaveBeenCalled();
      expect(mockCache.saveInCache).not.toHaveBeenCalled();
      expect(responseCache).toEqual(mappedClients);
    });
  });

  describe('verify for getClientById function', () => {
    test('returns client by id and save in cache', async () => {
      mockCache.getByIdFromCache.mockReturnValueOnce(undefined);
      mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(clients);
      const response = await sut.getClientById('1');
      expect(mockCache.getByIdFromCache).toHaveBeenCalledWith('1', 'c');
      expect(mockCache.saveInCache).toHaveBeenCalledWith(clients, 'c');
      expect(response).toEqual(mappedClientId1);
    });

    test('returns client by id from the cache', async () => {
      mockCache.getByIdFromCache.mockReturnValueOnce(clients[0]);
      const response = await sut.getClientById('1');
      expect(mockCache.getByIdFromCache).toHaveBeenCalledWith('1', 'c');
      expect(mockInsuranceClient.executeEndpoint).not.toHaveBeenCalled();
      expect(mockCache.saveInCache).not.toHaveBeenCalled();
      expect(response).toEqual(mappedClientId1);
    });

    test('throws 404 error as id does not exist', async () => {
      let thrownError;
      mockCache.getByIdFromCache.mockReturnValueOnce(undefined);
      mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(clients);
      try {
        await sut.getClientById('4');
      }
      catch (error) {
        thrownError = error;
      }
      expect(mockCache.getByIdFromCache).toHaveBeenCalledWith('4', 'c');
      expect(mockCache.saveInCache).toHaveBeenCalledWith(clients, 'c');
      expect(thrownError).toEqual({ code: 404, error: 'Not Found!' });
    });
  });

  describe('verify for getClientPolicies function', () => {
    test('returns client policies and save in cache', async () => {
      mockCache.getByIdFromCache.mockReturnValueOnce(undefined);
      mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(clients);
      const response = await sut.getClientPolicies('1');
      expect(mockCache.getByIdFromCache).toHaveBeenCalledWith('1', 'c');
      expect(mockCache.saveInCache).toHaveBeenCalledWith(clients, 'c');
      expect(response).toEqual(mappedPoliciesId1);
    });

    test('returns client policies from cache', async () => {
      mockCache.getByIdFromCache.mockReturnValueOnce(clients[0]);
      const response = await sut.getClientPolicies('1');
      expect(mockCache.getByIdFromCache).toHaveBeenCalledWith('1', 'c');
      expect(mockInsuranceClient.executeEndpoint).not.toHaveBeenCalled();
      expect(mockCache.saveInCache).not.toHaveBeenCalled();
      expect(response).toEqual(mappedPoliciesId1);
    });

    test('throws 404 error as id does not exist', async () => {
      let thrownError;
      mockCache.getByIdFromCache.mockReturnValueOnce(undefined);
      mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(clients);
      try {
        await sut.getClientPolicies('4');
      }
      catch (error) {
        thrownError = error;
      }
      expect(mockCache.getByIdFromCache).toHaveBeenCalledWith('4', 'c');
      expect(mockCache.saveInCache).toHaveBeenCalledWith(clients, 'c');
      expect(thrownError).toEqual({ code: 404, error: 'Not Found!' });
    });
  });
});
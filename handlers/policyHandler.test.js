/* eslint-disable max-len */
const {
  policies,
  mappedPolicies,
  mappedPoliciesId1
} = require('./mocks/data');
const _ = require('lodash');

describe('policy handler should', () => {

  const mockCache = {
    saveInCache: jest.fn(),
    getByIdFromCache: jest.fn(),
    getAllFromCache: jest.fn()
  };

  const mockInsuranceClient = {
    executeEndpoint: jest.fn()
  };

  const sut = require('./policyHandler')(mockInsuranceClient);

  afterEach(() => {
    jest.clearAllMocks();
  });

  jest.mock('../storage/cache', () => mockCache);
  jest.mock('../services/insuranceClient', () => mockInsuranceClient);

  describe('verify for getPolicies function', () => {
    test('returns policies from external api filtered with limit and save all in cache', async () => {
      mockCache.getAllFromCache.mockReturnValueOnce([]);
      mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(policies);
      const response = await sut.getPolicies({ limit: 2 });
      expect(mockCache.getAllFromCache).toHaveBeenCalledWith('p');
      expect(mockCache.saveInCache).toHaveBeenCalledWith(policies, 'p');
      expect(response).toEqual([ ..._.take(mappedPolicies, 2) ]);
    });

    test('returns policies from cache', async () => {
      mockCache.getAllFromCache.mockReturnValueOnce(policies);
      const responseCache = await sut.getPolicies({ limit: 10 });
      expect(mockCache.getAllFromCache).toHaveBeenCalledWith('p');
      expect(mockInsuranceClient.executeEndpoint).not.toHaveBeenCalled();
      expect(mockCache.saveInCache).not.toHaveBeenCalled();
      expect(responseCache).toEqual(mappedPolicies);
    });
  });

  describe('verify for getPolicyById function', () => {
    test('returns policy by id and save in cache', async () => {
      mockCache.getByIdFromCache.mockReturnValueOnce(undefined);
      mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(policies);
      const response = await sut.getPolicyById('p1');
      expect(mockCache.getByIdFromCache).toHaveBeenCalledWith('p1', 'p');
      expect(mockCache.saveInCache).toHaveBeenCalledWith(policies, 'p');
      expect(response).toEqual(mappedPoliciesId1);
    });

    test('returns policy by id from the cache', async () => {
      mockCache.getByIdFromCache.mockReturnValueOnce(policies[0]);
      const response = await sut.getPolicyById('p1');
      expect(mockCache.getByIdFromCache).toHaveBeenCalledWith('p1', 'p');
      expect(mockInsuranceClient.executeEndpoint).not.toHaveBeenCalled();
      expect(mockCache.saveInCache).not.toHaveBeenCalled();
      expect(response).toEqual(mappedPoliciesId1);
    });

    test('throws 404 error as id does not exist', async () => {
      let thrownError;
      mockCache.getByIdFromCache.mockReturnValueOnce(undefined);
      mockInsuranceClient.executeEndpoint.mockResolvedValueOnce(policies);
      try {
        await sut.getPolicyById('4');
      }
      catch (error) {
        thrownError = error;
      }
      expect(mockCache.getByIdFromCache).toHaveBeenCalledWith('4', 'p');
      expect(mockCache.saveInCache).toHaveBeenCalledWith(policies, 'p');
      expect(thrownError).toEqual({ code: 404, error: 'Not Found!' });
    });
  });
});
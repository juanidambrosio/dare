const insuranceClient = require('../services/insuranceClient');
const {
  getClients,
  getClientById,
  getClientPolicies
} = require('../handlers/clientHandler')(insuranceClient);
const config = require('../config/config');

async function routes(fastify) {
  insuranceClient.createInstance();

  fastify.addHook('onRequest', async (request, reply) => {
    if (config.jwt_enabled) {
      try {
        await request.jwtVerify();
      } catch (error) {
        reply.code(401).send({code: 401, message: 'Unauthorized' });
      }
    }
  });

  fastify.get('/clients', async (request, reply) => {
    const queryString = {
      limit: request.query.limit ? Number(request.query.limit) : 10,
      name: request.query.name
    };

    return getClients(queryString)
      .then(savedItems => reply.code(200).send(savedItems))
      .catch(error => {
        return reply.code(error.code || 500).send(error);
      });
  });

  fastify.get('/clients/:id', async (request, reply) => {
    return getClientById(request.params.id)
      .then(savedItem => reply.code(200).send(savedItem))
      .catch(error => {
        return reply.code(error.code || 500).send(error);
      });
  });

  fastify.get('/clients/:id/policies', async (request, reply) => {
    return getClientPolicies(request.params.id)
      .then(savedItem => reply.code(200).send(savedItem))
      .catch(error => {
        return reply.code(error.code || 500).send(error);
      });
  });
}

module.exports = routes;
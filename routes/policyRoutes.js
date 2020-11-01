const insuranceClient = require('../services/insuranceClient');
const {
  getPolicies,
  getPolicyById
} = require('../handlers/policyHandler')(insuranceClient);

async function routes(fastify) {
  insuranceClient.createInstance();

  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send(err);
    }
  });

  fastify.get('/policies', async (request, reply) => {
    const queryString = {
      limit: request.query.limit ? Number(request.query.limit) : 10
    };

    return getPolicies(queryString)
      .then(savedItems => reply.code(200).send(savedItems))
      .catch(error => {
        return reply.code(error.code || 500).send(error);
      });
  });

  fastify.get('/policies/:id', async (request, reply) => {
    return getPolicyById(request.params.id)
      .then(savedItem => reply.code(200).send(savedItem))
      .catch(error => {
        return reply.code(error.code || 500).send(error);
      });
  });
}

module.exports = routes;
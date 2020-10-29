const insuranceClient = require('../services/insuranceClient');
const {
  getPolicies,
  getPolicyById
} = require('../handlers/policyHandler')(insuranceClient);

async function routes(fastify) {
  insuranceClient.createInstance();
  fastify.get('/policies', async (request, reply) => {
    return getPolicies()
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
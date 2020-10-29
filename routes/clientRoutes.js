const insuranceClient = require('../services/insuranceClient');
const {
  getClients,
  getClientById,
  getClientPolicies
} = require('../handlers/clientHandler')(insuranceClient);

async function routes(fastify) {
  insuranceClient.createInstance();
  fastify.get('/clients', async (request, reply) => {
    return getClients()
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
}

module.exports = routes;

module.exports = insuranceClient => {
  return async function routes(fastify) {
    fastify.get('/policies', async (request, reply) => {
      return insuranceClient.executeEndpoint(
        insuranceClient.getPolicies
      )
        .then(response => reply.code(200).send(response.data))
        .catch(error => {
          return reply.code(error.statusCode || 500).send(error);
        });
    });
  };
};
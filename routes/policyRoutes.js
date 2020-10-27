async function routes(fastify) {
  fastify.get('/policies', async (request, reply) => {
    return reply.code(200).send({ message: 'This is your policy!' });
  });
}

module.exports = routes;
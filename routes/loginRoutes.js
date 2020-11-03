const { loginSchema } = require('../helpers/validator');

async function routes(fastify) {
  const { getToken } = require('../handlers/loginHandler')(fastify);
  fastify.post('/login', { schema: loginSchema }, async (request, reply) => {
    return getToken(request.body)
      .then(token => reply.code(200).send(token))
      .catch(error => {
        return reply.code(error.code || 500).send(error);
      });
  });
  fastify.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      reply.code(400).send({code: 400, message: 'Invalid Payload'});
    }
  });
}

module.exports = routes;
const authClient = require('../services/authClient');
const { getToken } = require('../handlers/loginHandler')(authClient);

async function routes(fastify) {
  authClient.createInstance();
  //TODO: Add validation for incoming body
  fastify.post('/login', async (request, reply) => {
    return getToken(request.body)
      .then(token => reply.code(200).send(token))
      .catch(error => {
        return reply.code(error.code || 500).send(error);
      });
  });

}

module.exports = routes;
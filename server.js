const start = async () => {
  const fastify = buildServer();

  try {
    await fastify.listen(3000, '0.0.0.0');
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    throw new Error(err);
  }
};

const buildServer = () => {
  const fastify = require('fastify')({
    logger: true
  });

  fastify.register(require('./routes/policyRoutes'), { prefix: '/api/v1' });

  return fastify;
};

start();
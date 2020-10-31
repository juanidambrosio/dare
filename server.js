const config = require('./config/config');

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

  fastify.register(require('fastify-auth0-verify'), {
    domain: config.authprovider.domain,
    secret: config.authprovider.secret
  });

  fastify.register(require('./routes/policyRoutes'),
    { prefix: '/api/v1' });

  fastify.register(require('./routes/clientRoutes'),
    { prefix: '/api/v1'});

  fastify.register(require('./routes/loginRoutes'),
    { prefix: '/api/v1'});

  return fastify;
};

start();
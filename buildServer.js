const config = require('./config/config');

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

module.exports = buildServer;
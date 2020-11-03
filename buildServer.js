const buildServer = () => {
  const fastify = require('fastify')({
    logger: true
  });

  fastify.register(require('fastify-jwt'), {
    secret: require('./config/config').secret
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
const { expires_in } = require('../config/config');

const getToken = fastify => async credentials => {
  const token = fastify.jwt.sign(credentials, { expiresIn: expires_in });
  return token ? { token, type: 'Bearer', expires_in} : createError(401);
};

module.exports = fastify => { return {
  getToken: getToken(fastify)
};
};
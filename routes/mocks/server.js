const getClients = async fastify => {
  const reply = await fastify.inject({
    method: 'GET',
    url: 'api/v1/clients'
  });
  return {
    statusCode: reply.statusCode,
    response: getResponse(reply, [])
  };
};

const getClientId = fastify => async id => {
  const reply = await fastify.inject({
    method: 'GET',
    url: `api/v1/clients/${id}`
  });
  return {
    statusCode: reply.statusCode,
    response: getResponse(reply, [])
  };
};

const getClientIdPolicies = fastify => async id => {
  const reply = await fastify.inject({
    method: 'GET',
    url: `api/v1/clients/${id}/policies`
  });
  return {
    statusCode: reply.statusCode,
    response: getResponse(reply, [])
  };
};

const getResponse = (reply, defaultValue) =>
  reply.payload ? JSON.parse(reply.payload) : defaultValue;

module.exports = {
  getClients,
  getClientId,
  getClientIdPolicies
};
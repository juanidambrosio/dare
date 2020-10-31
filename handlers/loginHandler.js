const getToken = authClient => async credentials => {
  return await authClient.login(credentials);
};

module.exports = authClient => {
  return {
    getToken: getToken(authClient)
  };
};
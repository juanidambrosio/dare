const createError = code => {
  switch (code) {
  case 404:
    throw {
      code: 404,
      error: 'Not Found!'
    };
  case 401:
    throw {
      code: 401,
      error: 'Unauthorized'
    };
  default:
    throw {
      code: 500,
      error: 'Internal Server Error'
    };
  }
};

module.exports = {
  createError
};
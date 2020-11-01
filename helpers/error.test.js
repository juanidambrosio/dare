const sut = require('./error');

describe('error helper should', () => {
  test('create error 401', () => {
    let thrownError;

    try {
      sut.createError(401);
    }
    catch (error) {
      thrownError = error;
    }
    expect(thrownError).toEqual({
      code: 401,
      error: 'Unauthorized'
    });
  });

  test('create error 404', () => {
    let thrownError;

    try {
      sut.createError(404);
    }
    catch (error) {
      thrownError = error;
    }
    expect(thrownError).toEqual({
      code: 404,
      error: 'Not Found!'
    });
  });

  test('create error 500', () => {
    let thrownError;

    try {
      sut.createError(1);
    }
    catch (error) {
      thrownError = error;
    }
    expect(thrownError).toEqual({
      code: 500,
      error: 'Internal Server Error'
    });
  });
});
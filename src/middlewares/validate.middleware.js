const AppError = require('../utils/appError.util');
const HTTP_STATUS = require('../constants/httpStatus');

const validate = (schema) => async (req, res, next) => {
  try {
    const parsed = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    req.body = parsed.body || req.body;
    req.query = parsed.query || req.query;
    req.params = parsed.params || req.params;

    return next();
  } catch (error) {
    if (error.errors) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join('.').replace(/^(body|query|params)\./, ''),
        message: err.message,
      }));

      return next(
        new AppError(
          'Input validation failed',
          HTTP_STATUS.BAD_REQUEST,
          'VALIDATION_ERROR',
          formattedErrors
        )
      );
    }
    return next(error);
  }
};

module.exports = validate;

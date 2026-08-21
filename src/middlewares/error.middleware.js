const env = require('../config/env');
const HTTP_STATUS = require('../constants/httpStatus');
const ApiResponse = require('../utils/response.util');

const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';
  let errorCode = err.errorCode || 'INTERNAL_ERROR';
  let details = err.details || null;

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = `Invalid resource ID format for field: ${err.path}`;
    errorCode = 'INVALID_RESOURCE_ID';
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value entered for unique field: ${field}`;
    errorCode = 'DUPLICATE_FIELD_VALUE';
  }

  // Handle Mongoose Schema Validation Error
  if (err.name === 'ValidationError') {
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
    message = 'Database schema validation failed';
    errorCode = 'DATABASE_VALIDATION_ERROR';
    details = Object.values(err.errors).map((e) => e.message);
  }

  // Handle JWT Malformed or Invalid Signature
  if (err.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Invalid authentication token provided';
    errorCode = 'INVALID_TOKEN';
  }

  // Handle JWT Expiration
  if (err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Authentication token has expired';
    errorCode = 'TOKEN_EXPIRED';
  }

  if (env.NODE_ENV === 'development') {
    console.error('[ERROR] Detailed stack trace:', err);
  } else {
    console.error(`[ERROR] Code: ${errorCode} | Message: ${message}`);
  }

  return ApiResponse.error(res, message, statusCode, errorCode, details);
};

module.exports = globalErrorHandler;

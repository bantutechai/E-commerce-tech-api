const HTTP_STATUS = require('../constants/httpStatus');

class ApiResponse {
  static success(res, message = 'Success', data = {}, statusCode = HTTP_STATUS.OK) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res, message = 'Internal Server Error', statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, errorCode = 'INTERNAL_ERROR', details = null) {
    const responseBody = {
      success: false,
      error: {
        code: errorCode,
        message,
        timestamp: new Date().toISOString(),
      },
    };

    if (details) {
      responseBody.error.details = details;
    }

    return res.status(statusCode).json(responseBody);
  }
}

module.exports = ApiResponse;

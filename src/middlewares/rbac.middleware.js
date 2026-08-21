const AppError = require('../utils/appError.util');
const HTTP_STATUS = require('../constants/httpStatus');

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new AppError(
          'User authentication context missing',
          HTTP_STATUS.UNAUTHORIZED,
          'UNAUTHENTICATED'
        )
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          'You do not have permission to perform this action',
          HTTP_STATUS.FORBIDDEN,
          'INSUFFICIENT_PERMISSIONS'
        )
      );
    }

    return next();
  };
};

module.exports = authorize;

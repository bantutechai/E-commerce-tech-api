const { verifyAccessToken } = require('../utils/jwt.util');
const AppError = require('../utils/appError.util');
const HTTP_STATUS = require('../constants/httpStatus');
const User = require('../models/user.model');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(
        'Authentication token is required',
        HTTP_STATUS.UNAUTHORIZED,
        'MISSING_TOKEN'
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      throw new AppError(
        'The user belonging to this token no longer exists',
        HTTP_STATUS.UNAUTHORIZED,
        'USER_NOT_FOUND'
      );
    }

    if (!currentUser.isActive) {
      throw new AppError(
        'User account is deactivated',
        HTTP_STATUS.FORBIDDEN,
        'ACCOUNT_DISABLED'
      );
    }

    req.user = {
      id: currentUser._id,
      email: currentUser.email,
      role: currentUser.role,
    };

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = authenticate;

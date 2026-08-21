const UserRepository = require('../repositories/user.repository');
const { hashPassword, comparePassword } = require('../utils/hash.util');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt.util');
const AppError = require('../utils/appError.util');
const HTTP_STATUS = require('../constants/httpStatus');

class AuthService {
  async register(userData) {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError(
        'Email address is already in use',
        HTTP_STATUS.CONFLICT,
        'EMAIL_ALREADY_EXISTS'
      );
    }

    const hashedPassword = await hashPassword(userData.password);

    const newUser = await UserRepository.create({
      ...userData,
      passwordHash: hashedPassword,
    });

    const userResponse = newUser.toJSON();

    return {
      user: userResponse,
    };
  }

  async login(email, password) {
    const user = await UserRepository.findByEmail(email, true);

    if (!user || !(await comparePassword(password, user.passwordHash))) {
      throw new AppError(
        'Invalid email or password',
        HTTP_STATUS.UNAUTHORIZED,
        'INVALID_CREDENTIALS'
      );
    }

    if (!user.isActive) {
      throw new AppError(
        'User account is deactivated',
        HTTP_STATUS.FORBIDDEN,
        'ACCOUNT_DISABLED'
      );
    }

    await UserRepository.updateLastLogin(user._id);

    const tokenPayload = { id: user._id, role: user.role };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    const userResponse = user.toJSON();

    return {
      user: userResponse,
      accessToken,
      refreshToken,
    };
  }
}

module.exports = new AuthService();

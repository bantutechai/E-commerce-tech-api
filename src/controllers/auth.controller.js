const AuthService = require('../services/auth.service');
const ApiResponse = require('../utils/response.util');
const HTTP_STATUS = require('../constants/httpStatus');
const env = require('../config/env');

class AuthController {
  async register(req, res, next) {
    try {
      const result = await AuthService.register(req.body);
      return ApiResponse.success(
        res,
        'User registered successfully',
        result,
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return ApiResponse.success(res, 'Login successful', {
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return ApiResponse.success(res, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();

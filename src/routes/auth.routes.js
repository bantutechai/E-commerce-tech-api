const express = require('express');
const AuthController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/rbac.middleware');
const { authRateLimiter } = require('../middlewares/rateLimit.middleware');
const { registerSchema, loginSchema } = require('../validations/auth.validation');
const { ROLES } = require('../constants/roles');

const router = express.Router();

router.post(
  '/register',
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  validate(registerSchema),
  AuthController.register
);

router.post(
  '/login',
  authRateLimiter,
  validate(loginSchema),
  AuthController.login
);

router.post('/logout', AuthController.logout);

module.exports = router;

const express = require('express');
const SettingsController = require('../controllers/settings.controller');
const validate = require('../middlewares/validate.middleware');
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/rbac.middleware');
const { updateSettingsSchema } = require('../validations/settings.validation');
const { ROLES } = require('../constants/roles');

const router = express.Router();

router.get('/', SettingsController.getSettings);

router.put(
  '/',
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  validate(updateSettingsSchema),
  SettingsController.updateSettings
);

module.exports = router;

const express = require('express');
const MediaController = require('../controllers/media.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/rbac.middleware');
const { ROLES } = require('../constants/roles');

const router = express.Router();

router.post(
  '/upload',
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR),
  MediaController.uploadMedia
);

router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  MediaController.deleteMedia
);

module.exports = router;

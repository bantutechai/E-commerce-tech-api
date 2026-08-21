const express = require('express');
const ProductController = require('../controllers/product.controller');
const validate = require('../middlewares/validate.middleware');
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/rbac.middleware');
const { createProductSchema, updateProductSchema } = require('../validations/product.validation');
const { ROLES } = require('../constants/roles');

const router = express.Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);

router.post(
  '/',
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVENTORY_MANAGER),
  validate(createProductSchema),
  ProductController.createProduct
);

router.put(
  '/:id',
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVENTORY_MANAGER),
  validate(updateProductSchema),
  ProductController.updateProduct
);

router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  ProductController.deleteProduct
);

module.exports = router;

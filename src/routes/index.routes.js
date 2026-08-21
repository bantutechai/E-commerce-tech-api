const express = require('express');
const authRoutes = require('./auth.routes');
const categoryRoutes = require('./category.routes');
const productRoutes = require('./product.routes');
const settingsRoutes = require('./settings.routes');
const mediaRoutes = require('./media.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/settings', settingsRoutes);
router.use('/media', mediaRoutes);

module.exports = router;


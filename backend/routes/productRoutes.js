const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const productController = require('../controller/productController');

// @Desc    get all product
// @Route   get /api/products
// @Access  Public
router.get('/', productController.getAllProduct);

// @Desc    get detail product
// @Route   get /api/products/:id
// @Access  Public
router.get('/:id', productController.getDetailProduct);

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { check } = require('express-validator');

const userController = require('../controller/userController');


// @Desc    Register new user (customer)
// @Route   POST /api/users
// @Access  Public  
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password_confirmation', 'Password confirmation is required').not().isEmpty(),
], userController.register);

// @Desc    Register new user (customer)
// @Route   POST /api/users
// @Access  Public
router.post('/login', [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
], userController.login);

// @Desc    get all customer
// @Route   get /api/users/list
// @Access  Private (for user role admin only)
router.get('/list', [auth, admin], userController.getAllCustomer);

module.exports = router;
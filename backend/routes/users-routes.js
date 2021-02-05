const express = require('express');

const usersController = require('../controllers/users-controller');
const usersValidator = require('../validators/users-validator');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post('/signup', usersValidator.signupValidate, usersController.signup);

router.post('/login', usersValidator.loginValidate, usersController.login);

module.exports = router;

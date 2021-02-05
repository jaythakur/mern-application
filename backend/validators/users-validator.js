const { check } = require('express-validator');

const signupValidate =
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min: 6})
  ];

const loginValidate =
  [
    check('email').not().isEmpty()
  ];

exports.signupValidate = signupValidate;
exports.loginValidate = loginValidate;

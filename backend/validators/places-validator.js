const { check } = require('express-validator');

const createPlaceValidate =
  [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),
    check('address').not().isEmpty()
  ];

const updatePlaceValidate =
  [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5})
  ];

exports.createPlaceValidate = createPlaceValidate;
exports.updatePlaceValidate = updatePlaceValidate;

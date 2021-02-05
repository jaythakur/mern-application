const express = require('express');

const placesController = require('../controllers/places-controller');
const placeValidator = require('../validators/places-validator');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/:pid', placesController.getPlaceById);

router.get('/user/:uid', placesController.getPlacesByUserId);

router.use(checkAuth);

router.post(
  '/',
  placeValidator.createPlaceValidate,
  placesController.createPlace
);

router.patch(
  '/:pid',
  placeValidator.updatePlaceValidate,
  placesController.updatePlaceById
);

router.delete('/:pid', placesController.deletePlace);

module.exports = router;

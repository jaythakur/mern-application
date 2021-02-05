const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../utill/location');
const Place = require('../models/place');
const User = require('../models/user');

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch(err) {
    const error = new HttpError('Something went wrong, could not find a place', 500);
    return next(error);
  }
  
  if (!place) {
    // const error = new Error('Could not find a place for the provided id.');
    // error.code = 404;
    return next(new HttpError('Could not find a place for the provided id.', 404));
    // return res.status(400).json({message: 'Could not find a place for the provided id.'})
  }
  console.log('Get request in places');
  res.json({place: place.toObject({ getters: true })});
}

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate('places');
    // places = await Place.find({ creator: userId });
  } catch(err) {
    const error = new HttpError('Something went wrong, could not find a place', 500);
    return next(error);
  }
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    const error = new HttpError('Could not find a place for the provided user id.', 404);
    return next(error);
    // const error = new Error('Could not find a place for the provided user id.');
    // error.code = 404;
    // throw error;
    // return res.status(400).json({message: 'Could not find a place for the provided user id.'})
  }
  console.log('Get request in places');
  res.json({places: userWithPlaces.places.map(place => place.toObject({ getters: true }))});
}

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    next(new HttpError('Invalid inputs data passed, please check your data.', 422));
  }
  let coordinates;
  const { title, description, address, creator } = req.body;

  try {
    coordinates = await getCoordsForAddress(address);
  } catch(error) {
    return next(error);
  }
  
  const createdPlace = new Place({
    title,
    description,
    address,
    coordinates,
    location: coordinates,
    image: 'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',    
    creator
  });

  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError('Creating place failed, please try again', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 500);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save();
    await sess.commitTransaction();
  } catch(err) {
    const error = new HttpError('Creating place failed, please try again', 500);
    return next(error);
  }
  
  res.status(201).json(createdPlace);
};

const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    return next(new HttpError('Invalid inputs data passed, please check your data.', 422));
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch(err) {
    const error = new HttpError(
      'Something went wrong, could not update place.', 500
    );

    return next(error);
  }

  // if (!place) {
  //   return next(new HttpError('Could not find a place for the provided id.', 404));
  // }


  if (place.creator.toString() !== req.userData.userId) {
    return next(new HttpError('You are not allowed to edit this place..', 401));
  }
  
  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch(err) {
    const error = new HttpError(
      'Something went wrong, could not update place.', 500
    )

    return next(error);
  }

  res.status(201).json({place: place.toObject({ getters: true })});
}

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId).populate('creator');
  } catch(err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.', 500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      'Could not find place for this id.', 404
    );
    return next(error);
  }

  if (place.creator.id !== req.userData.userId) {
    return next(new HttpError('You are not allowed to delete this place..', 401));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save();
    await sess.commitTransaction();
  } catch(err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.', 500
    );
    return next(error);
  }

  res.status(201).json({message: 'Deleted Place'});
}
// module.exports = { getPlaceById, getPlaceByUserId };

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;

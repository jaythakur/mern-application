const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

let DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Jay Thakur',
    email: 'test@test.com',
    password: 'password'
  }
];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password')
  } catch (err) {
    return next(new HttpError(
      'Fetching users failed, please try again later.', 500
    ))
  }
  
  res.json({ users: users.map(user => user.toObject({ getters: true })) });
}

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    // throw new HttpError('Invalid inputs data passed, please check your data.', 422);
    // return next(new HttpError('Invalid inputs data passed, please check your data.', 422));
  }
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch(err) {
    return next(new HttpError(
      'Signing up failed, please try again later.', 500
    ))
  }

  if (existingUser) {
    return next(new HttpError(
      'User exists already, please login instead.', 422
    ))
  }

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again',
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashPassword,
    image: 'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
    places: []
  });

  try {
    await createdUser.save();
  } catch(err) {
    const error = new HttpError('Creating user failed, try again', 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
      userId: createdUser.id,
      email: createdUser.email
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError('Signing up failed, try again', 500);
    return next(error);
  }
  
  res.status(201).json({userId: createdUser.id, email: createdUser.email, token: token});
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs data passed, please check your data.', 422));
  }
  const { email, password } = req.body;
  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch(err) {
    return next(new HttpError('Logging in failed, please try again later.', 500));
  }

  if(!identifiedUser) {
    return next(new HttpError('Could not identify user, crendentials seem to be wrong.', 401));
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if(!isValidPassword) {
    return next(new HttpError('Invalid crendentials, could you not log you in.', 401));
  }

  let token;
  try {
    token = jwt.sign(
      {
      userId: identifiedUser.id,
      email: identifiedUser.email
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError('Signing up failed, try again', 500);
    return next(error);
  }

  res.json({message: 'Logged in!', userId: identifiedUser.id, email: identifiedUser.email, token: token});

  // res.json({message: 'Logged in!', user: identifiedUser.toObject({ getters: true })});
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

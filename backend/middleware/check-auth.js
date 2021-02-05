const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Beearer Token'
    if(!token) {
      throw new Error('Authentication failed1');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId }
    next();
  } catch (err) {
      const error = new HttpError(
        'Authentication failed',
        403
      );
      return next(error);
  }  
}
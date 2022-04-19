const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const keyAuth = (...requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('basic', { session: false })(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = keyAuth;

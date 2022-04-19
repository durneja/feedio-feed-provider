const express = require('express');
//const keyAuth = require('../../middlewares/keyAuth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const feedController = require('../../controllers/feed.controller');

const router = express.Router();

router
  .route('/')
  .get(feedController.getData);
  // .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

module.exports = router;
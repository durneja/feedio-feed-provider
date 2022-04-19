const express = require('express');
//const keyAuth = require('../../middlewares/keyAuth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const feedChainlinkController = require('../../controllers/feedChainlink.controller');

const router = express.Router();

router
  .route('/')
  .get(feedChainlinkController.getData);

module.exports = router;

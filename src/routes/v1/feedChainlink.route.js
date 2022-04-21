const express = require('express');
const feedChainlinkController = require('../../controllers/feedChainlink.controller');

const router = express.Router();

router
  .route('/')
  .get(feedChainlinkController.getData);

module.exports = router;

const express = require('express');
const feedController = require('../../controllers/feed.controller');

const router = express.Router();

router
  .route('/')
  .get(feedController.getData);

module.exports = router;
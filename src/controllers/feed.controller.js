const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { feedService } = require('../services');

const getData = catchAsync(async (req, res) => {
  const result = await feedService.getData();
  res.send(result);
});

module.exports = {
  getData
};

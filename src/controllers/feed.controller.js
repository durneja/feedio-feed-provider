const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { feedService } = require('../services');

const getData = catchAsync(async (req, res) => {
  const data = await feedService.getData();
  console.log(data);
  res.send({ data });
});

module.exports = {
  getData
};

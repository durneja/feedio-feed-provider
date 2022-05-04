const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { feedChainlinkService } = require('../services');

const getData = catchAsync(async (req, res) => {
  const result = await feedChainlinkService.getData();
  console.log(result);
  res.send({ "timestamp": Date.now(), "data": result });
});

module.exports = {
  getData
};

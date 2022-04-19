const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for data
 * @returns {Promise<QueryResult>}
 */
const getData = async () => {
  const data = {"data": "Working fine"}
  return data;
};

module.exports = {
  getData
};

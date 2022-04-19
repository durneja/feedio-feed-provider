const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const axios = require('axios');

/**
 * Query for data
 * @returns {Promise<QueryResult>}
 */
const getData = async () => {

  const data = {"data": "It's working"};

  return (200, {"response": data});
};

module.exports = {
  getData
};

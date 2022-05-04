const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const axios = require('axios');
const ethers = require('ethers');
const { currencyKeys, aggregatorV3InterfaceABI } = require('../config');

const contractMap = {
  "BTC": "0xf4030086522a5beea4988f8ca5b36dbc97bee88c",
  "ETH": "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419",
  "BNB": "0x14e613ac84a31f709eadbdf89c6cc390fdc9540a",
  "MATIC": "0x7bac85a8a13a4bcd8abb3eb7d6b4d632c5a57676"
};

const getCryptoPrice = async (coin) => {

  const provider = new ethers.providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/439411c855bf222c58850d77/eth/mainnet');

  const addr = contractMap[coin];
  const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider);
  const decimals = await priceFeed.decimals();

  const roundData = await priceFeed.latestRoundData();
  let cryptoValue = parseFloat(ethers.utils.formatUnits(roundData.answer, decimals));
  console.log(cryptoValue);
  return cryptoValue;
}

/**
 * Query for data
 * @returns {Promise<QueryResult>}
 */
 const getData = async () => {

  const btcPromise = getCryptoPrice(currencyKeys[0]);
  const ethPromise = getCryptoPrice(currencyKeys[1]);
  const bnbPromise = getCryptoPrice(currencyKeys[4]);
  const maticPromise = getCryptoPrice(currencyKeys[5]);

  const data = await Promise.all([btcPromise, ethPromise, bnbPromise, maticPromise]);
  let result = {};
  for(let i = 0; i < data.length; i++) {
    result[currencyKeys[i]] = data[i];
  }  
  return result;
};

module.exports = {
  getData
};

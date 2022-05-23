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
  "MATIC": "0x7bac85a8a13a4bcd8abb3eb7d6b4d632c5a57676",
  "LINK" : "0x2c1d072e956affc0d435cb7ac38ef18d24d9127c",
  "ADA" : "0xae48c91df1fe419994ffda27da09d5ac69c30f55",
  "SOL" : "0x4ffc43a60e009b551865a93d232e33fce9f01507",
  "DOT" : "0x1c07afb8e2b827c5a4739c6d59ae3a5035f28734",
  "UNI" : "0x553303d460ee0afb37edff9be42922d8ff63220e"
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
  const linkPromise = getCryptoPrice(currencyKeys[6]);
  const adaPromise = getCryptoPrice(currencyKeys[7]);
  const solPromise = getCryptoPrice(currencyKeys[8]);
  const dotPromise = getCryptoPrice(currencyKeys[9]);
  const uniPromise = getCryptoPrice(currencyKeys[10]);

  const data = await Promise.all([btcPromise, ethPromise, bnbPromise, maticPromise, linkPromise, adaPromise, solPromise, dotPromise, uniPromise]);
  let result = {};
  const indexOfCurrencies = [0,1,4,5,6,7,8,9,10]
  for(let i = 0; i < indexOfCurrencies.length; i++) {
    result[currencyKeys[indexOfCurrencies[i]]] = data[i];
  } 
  return result;
};

module.exports = {
  getData
};

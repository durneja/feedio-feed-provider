const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const axios = require('axios');
const ethers = require('ethers');
const { currencyKeys } = require('../config');

/**
 * Query for data
 * @returns {Promise<QueryResult>}
 */
const getData = async () => {

  const btcPromise = getCryptoPrice(currencyKeys[0]);
  const ethPromise = getCryptoPrice(currencyKeys[1]);

  const data = await Promise.all([btcPromise, ethPromise]);
  let result = {};
  for(let i = 0; i < data.length; i++) {
    result[currencyKeys[i]] = data[i];
  }  
  return result;
};

const contractMap = {
  "BTC": "0xf4030086522a5beea4988f8ca5b36dbc97bee88c",
  "ETH": "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419"
};

const getCryptoPrice = async (coin) => {

  const provider = new ethers.providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/439411c855bf222c58850d77/eth/mainnet');

  const aggregatorV3InterfaceABI = [
      {
          inputs: [],
          name: 'decimals',
          outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
          stateMutability: 'view',
          type: 'function'
      },
      {
          inputs: [],
          name: 'description',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function'
      },
      {
          inputs: [{ internalType: 'uint80', name: '_roundId', type: 'uint80' }],
          name: 'getRoundData',
          outputs: [
              { internalType: 'uint80', name: 'roundId', type: 'uint80' },
              { internalType: 'int256', name: 'answer', type: 'int256' },
              { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
              { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
              { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' }
          ],
          stateMutability: 'view',
          type: 'function'
      },
      {
          inputs: [],
          name: 'latestRoundData',
          outputs: [
              { internalType: 'uint80', name: 'roundId', type: 'uint80' },
              { internalType: 'int256', name: 'answer', type: 'int256' },
              { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
              { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
              { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' }
          ],
          stateMutability: 'view',
          type: 'function'
      },
      {
          inputs: [],
          name: 'version',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function'
      }
  ];

  const addr = contractMap[coin];
  const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider);
  const decimals = await priceFeed.decimals();

  const roundData = await priceFeed.latestRoundData();
  let cryptoValue = parseFloat(ethers.utils.formatUnits(roundData.answer, decimals));
  console.log(cryptoValue);
  return cryptoValue;
}

module.exports = {
  getData
};

const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const axios = require('axios');

/**
 * Query for data
 * @returns {Promise<QueryResult>}
 */
const getData = async () => {
  const binancePromise = fetchBinanceData();
  const coinmarketPromise = fetchCoinmarketcapData();
  const coinGeckoPromise = fetchCoingeckoData();

  const data = await Promise.all([binancePromise, coinmarketPromise, coinGeckoPromise]);

  return (200, {"response": data});
};

const postProcess = (data) => {
  var result = [];
  const dataLen = data.length;
  for(var i=0; i < dataLen; i++)
   result.push((data[0][i] + data[1][i] + data[2][i]) / 3);

  return result;
}

const fetchBinanceData = () => {
  const fetchURL = exchangeInfoMap.binance.baseUrl + exchangeInfoMap.binance.endpoint;

  let response = null;
  return new Promise(async (resolve, reject) => {
    try {
      response = await axios.get(fetchURL);
    } catch(ex) {
      response = null;
      // error
      console.log(ex);
      reject(ex);
    }

    if (response) {
      // success
      const jsonResponse = response.data;
      const extractedValues = processBinanceResponse(jsonResponse);
      resolve(extractedValues);
    }
  
  });    
}

const processBinanceResponse = (data) => {

  //Order: BTC, ETH, NEO, GAS
  let values = new Array(4);
  data.forEach(entry => {
    let key = entry.symbol;
    switch (key) {
      case exchangeInfoMap.binance.BTC:
        values[0] = parseFloat(entry.price);
        break;
      case exchangeInfoMap.binance.ETH:
        values[1] = parseFloat(entry.price);
        break;
      case exchangeInfoMap.binance.NEO:
        values[2] = parseFloat(entry.price);
        break;
      case exchangeInfoMap.binance.GAS:
        values[3] = parseFloat(entry.price);
        break;
      default:
        break;
    }
  });
  
  values[3] = values[3] * values[0];
  return values;
}

const fetchCoinmarketcapData = () => {
  const headerKey = exchangeInfoMap.coinmarketcap.authHeader;
  const headerVal = exchangeInfoMap.coinmarketcap.apiKey;
  const fetchURL = exchangeInfoMap.coinmarketcap.baseUrl + exchangeInfoMap.coinmarketcap.endpoint + "?id=1,1027,1376,1785";

  let response = null;
  return new Promise(async (resolve, reject) => {
    try {
      response = await axios.get(fetchURL, {
        headers: {
          [headerKey] : headerVal
        },
      });
    } catch(ex) {
      response = null;
      // error
      console.log(ex);
      reject(ex);
    }

    if (response) {
      // success
      const jsonResponse = response.data;
      const extractedValues = processCoinmarketcapResponse(jsonResponse.data);
      resolve(extractedValues);
    }
  
  });
    
}
const processCoinmarketcapResponse = (data) => {
  //Order: BTC, ETH, NEO, GAS
  let values = new Array(4);
  values[0] = data[exchangeInfoMap.coinmarketcap.BTC]?.quote.USD.price;
  values[1] = data[exchangeInfoMap.coinmarketcap.ETH]?.quote.USD.price;
  values[2] = data[exchangeInfoMap.coinmarketcap.NEO]?.quote.USD.price;
  values[3] = data[exchangeInfoMap.coinmarketcap.GAS]?.quote.USD.price;

  return values;

}
const fetchCoingeckoData = () => {
  const fetchURL = exchangeInfoMap.coingecko.baseUrl + exchangeInfoMap.coingecko.endpoint + "?vs_currency=usd&ids=bitcoin,ethereum,neo,gas";

  let response = null;
  return new Promise(async (resolve, reject) => {
    try {
      response = await axios.get(fetchURL);
    } catch(ex) {
      response = null;
      // error
      console.log(ex);
      reject(ex);
    }

    if (response) {
      // success
      const jsonResponse = response.data;
      const extractedValues = processCoingeckoResponse(jsonResponse);
      resolve(extractedValues);
    }
  
  });  
}

const processCoingeckoResponse = (data) => {

  //Order: BTC, ETH, NEO, GAS
  let values = new Array(4);
  data.forEach(entry => {
    let key = entry.id;
    switch (key) {
      case exchangeInfoMap.coingecko.BTC:
        values[0] = entry.current_price;
        break;
      case exchangeInfoMap.coingecko.ETH:
        values[1] = entry.current_price;
        break;
      case exchangeInfoMap.coingecko.NEO:
        values[2] = entry.current_price;
        break;
      case exchangeInfoMap.coingecko.GAS:
        values[3] = entry.current_price;
        break;
      default:
        break;
    }
  });
  
  return values;

}

const exchangeInfoMap = {
  "binance": {
    "baseUrl": "https://api.binance.com/api/v3/",
    "endpoint": "ticker/price",
    "BTC": "BTCUSDT",
    "ETH": "ETHUSDT",
    "NEO": "NEOUSDT",
    "GAS": "GASBTC"
  },
  "coinmarketcap": {
    "baseUrl": "https://pro-api.coinmarketcap.com/v1/",
    "endpoint": "cryptocurrency/quotes/latest",
    "apiKey": "4712d52e-69ab-43e5-9822-b014a6149073",
    "authHeader": "X-CMC_PRO_API_KEY",
    "BTC": "1",
    "ETH": "1027",
    "NEO": "1376",
    "GAS": "1785"
  },
  "coingecko": {
    "baseUrl": "https://api.coingecko.com/api/v3/",
    "endpoint": "coins/markets",
    "BTC": "bitcoin",
    "ETH": "ethereum",
    "NEO": "neo",
    "GAS": "gas"
  }
}
module.exports = {
  getData
};

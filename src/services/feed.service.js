const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const axios = require('axios');
const { currencyKeys } = require('../config');

/**
 * Query for data
 * @returns {Promise<QueryResult>}
 */
const getData = async () => {
  const binancePromise = fetchBinanceData();
  const coinMarketPromise = fetchCoinMarketcapData();
  const coinGeckoPromise = fetchCoinGeckoData();

  const data = await Promise.all([binancePromise, coinMarketPromise, coinGeckoPromise]);

  return postProcess(data);
};

const postProcess = (data) => {

  let result = {};
  data.forEach(el => {
    for (const property in el) {
      if(result.hasOwnProperty(property)){
        result[property] = result[property] + el[property];
      } else {
        result[property] = el[property];
      }
    }
  });

  for (const property in result) {
    result[property] = result[property] / 3;
  }

  return result;
}

const fetchBinanceData = () => {
  const fetchURL = `${exchangeInfoMap.binance.baseUrl}${exchangeInfoMap.binance.endpoint}`;

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
  // console.log('binance data --', data)
  let values = {};
  data.forEach((el) => {
    currencyKeys.forEach((key) => {
      if (el.symbol === exchangeInfoMap.binance[key]) {
        values[key] = parseFloat(el.price);
      }
    })
  })
  values[currencyKeys[3]] = values[currencyKeys[3]] * values[currencyKeys[0]];
  // console.log('binance final values--', values);
  return values;
}

const fetchCoinMarketcapData = () => {
  const headerKey = exchangeInfoMap.coinmarketcap.authHeader;
  const headerVal = exchangeInfoMap.coinmarketcap.apiKey;
  const fetchURL = `${exchangeInfoMap.coinmarketcap.baseUrl}${exchangeInfoMap.coinmarketcap.endpoint}?id=1,1027,1376,1785`;

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
      const extractedValues = processCoinMarketcapResponse(jsonResponse.data);
      resolve(extractedValues);
    }
  
  });
    
}
const processCoinMarketcapResponse = (data) => {
  // console.log('coinmarketcap data--', data)
  let values = {};
  // handling CoinMarketCap Object response
  Object.keys(data).forEach((el) => {
    currencyKeys.forEach((key) => {
      if (el === exchangeInfoMap.coinmarketcap[key]) {
        values[key] = data[exchangeInfoMap.coinmarketcap[key]]?.quote.USD.price;
      }
    })
  })
  // console.log('coinmarketcap final values--', values);
  return values;

}
const fetchCoinGeckoData = () => {
  const fetchURL = `${exchangeInfoMap.coingecko.baseUrl }${exchangeInfoMap.coingecko.endpoint}?vs_currency=usd&ids=bitcoin,ethereum,neo,gas`;

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
      const extractedValues = processCoinGeckoResponse(jsonResponse);
      resolve(extractedValues);
    }
  
  });  
}

const processCoinGeckoResponse = (data) => {
  // console.log('coingecko data--', data);

  let values = {};
  data.forEach((el) => {
    currencyKeys.forEach((key) => {
      if (el.id === exchangeInfoMap.coingecko[key]) {
        values[key] = el.current_price;
      }
    })
  })
  // console.log('coingecko final values--', values)
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

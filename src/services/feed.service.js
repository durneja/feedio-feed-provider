const axios = require('axios');
const { exchangeInfoMap } = require('../config');
const {
  processBinanceResponse,
  processCoinMarketcapResponse,
  processCoinGeckoResponse,
  postProcess,
} = require('../helpers/feed.helper');

/**
 * Trigger price feed data fetch from Binance, Coingecko and Coinmarketcap
 * @returns {Promise<QueryResult>}
 */
const getData = async () => {
  const binancePromise = fetchBinanceData();
  const coinMarketPromise = fetchCoinMarketcapData();
  const coinGeckoPromise = fetchCoinGeckoData();

  const data = await Promise.all([binancePromise, coinMarketPromise, coinGeckoPromise]);

  return postProcess(data);
};

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

const fetchCoinMarketcapData = () => {
  const headerKey = exchangeInfoMap.coinmarketcap.authHeader;
  const headerVal = exchangeInfoMap.coinmarketcap.apiKey;
  const fetchURL = `${exchangeInfoMap.coinmarketcap.baseUrl}${exchangeInfoMap.coinmarketcap.endpoint}?id=1,1027,1376,1785,1839,3890,1975,2010,5426,6636,7083`;

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

const fetchCoinGeckoData = () => {
  const fetchURL = `${exchangeInfoMap.coingecko.baseUrl }${exchangeInfoMap.coingecko.endpoint}?vs_currency=usd&ids=bitcoin,ethereum,neo,gas,binancecoin,matic-network,chainlink,cardano,solana,polkadot,uniswap`;

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

module.exports = {
  getData
};

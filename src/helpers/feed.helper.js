const { exchangeInfoMap, currencyKeys } = require("../config");
const { average } = require('../utils/utils');

const postProcess = (data) => {

    let result = {};
    data.forEach(el => {
      for (const property in el) {
        /* stores values of result[property] as array of values,
        eg: BTC: [4136, 4137, 4136] */
        if(result.hasOwnProperty(property)){
          result[property] = [...result[property], el[property]];
        } else {
          result[property] = [el[property]];
        }
      }
    });
  
    for (const property in result) {
      // gets average of each property in result[property] array
      result[property] = average(result[property]);
    }
  
    return result;
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

const processCoinMarketcapResponse = (data) => {
    // console.log('coinmarketcap data--', data)
    let values = {};
    // handling CoinMarketCap Object response
    Object.keys(data).forEach((el) => {
      currencyKeys.forEach((key) => {
        if (el === exchangeInfoMap.coinmarketcap[key]) {
          values[key] = data[exchangeInfoMap.coinmarketcap[key]].quote.USD.price;
        }
      })
    })
    // console.log('coinmarketcap final values--', values);
    return values;  
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



module.exports = {
    postProcess,
    processBinanceResponse,
    processCoinMarketcapResponse,
    processCoinGeckoResponse,
};

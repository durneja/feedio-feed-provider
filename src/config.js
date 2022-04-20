module.exports = {
    currencyKeys: [
        'BTC',
        'ETH',
        'NEO',
        'GAS',
    ],
    exchangeInfoMap: {
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
}

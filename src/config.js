const currencyKeys = [
  "BTC",
  "ETH",
  "NEO",
  "GAS",
  "BNB",
  "MATIC",
  "LINK",
  "ADA",
  "SOL",
  "DOT",
  "UNI"
];

const exchangeInfoMap = {
  "binance": {
    "baseUrl": "https://api.binance.com/api/v3/",
    "endpoint": "ticker/price",
    "BTC": "BTCUSDT",
    "ETH": "ETHUSDT",
    "NEO": "NEOUSDT",
    "GAS": "GASBTC",
    "BNB": "BNBUSDT",
    "MATIC": "MATICUSDT",
    "LINK": "LINKUSDT",
    "ADA": "ADAUSDT",
    "SOL": "SOLUSDT",
    "DOT": "DOTUSDT",
    "UNI": "UNIUSDT"
  },
  "coinmarketcap": {
    "baseUrl": "https://pro-api.coinmarketcap.com/v1/",
    "endpoint": "cryptocurrency/quotes/latest",
    "apiKey": "4712d52e-69ab-43e5-9822-b014a6149073",
    "authHeader": "X-CMC_PRO_API_KEY",
    "BTC": "1",
    "ETH": "1027",
    "NEO": "1376",
    "GAS": "1785",
    "BNB": "1839",
    "MATIC": "3890",
    "LINK": "1975",
    "ADA": "2010",
    "SOL": "5426",
    "DOT": "6636",
    "UNI": "7083"  
  },
  "coingecko": {
    "baseUrl": "https://api.coingecko.com/api/v3/",
    "endpoint": "coins/markets",
    "BTC": "bitcoin",
    "ETH": "ethereum",
    "NEO": "neo",
    "GAS": "gas",
    "BNB": "binancecoin",
    "MATIC": "matic-network",
    "LINK": "chainlink",
    "ADA": "cardano",
    "SOL": "solana",
    "DOT": "polkadot",
    "UNI": "uniswap"
  }
};

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

module.exports = {
  currencyKeys,
  exchangeInfoMap,
  aggregatorV3InterfaceABI,
}

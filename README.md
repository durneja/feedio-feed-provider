# Feedio Price Feed Provider

This is a node.js powered backend server that would act as the price feed provider. In this module, currently two price feeds are provided 
https://feed.feedio.xyz/v1/feed
https://feed.feedio.xyz/v1/feedChainlink

The first feed would retrieve price data from 3 sources - Binance, Coinmarketcap and Coingecko. The prices are averaged out to provide the final price for this particular provider.
The tokens/cryptocurrencies for which the prices would be fethed are - NEO, GAS, Bitcoin, Ethereum, Binance Coin, Polygon MATIC

The second feed would retrieve price data from the Chainlink price feeds - https://data.chain.link/
The tokens/cryptocurrencies for which the prices would be fethed are - Bitcoin, Ethereum, Binance Coin, Polygon MATIC

## License

[MIT](LICENSE)

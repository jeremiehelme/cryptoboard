export default async function binance(req, res) {
  try {
    var ccxt = require('ccxt')
    const exchangeId = 'binance'
      , exchangeClass = ccxt[exchangeId]
      , exchange = new exchangeClass({
        'apiKey': 'iinH3WV4oo0kDql4wQe6rHZ73OkYTt8SG9s51ILdAUtPXYfwaWfOegnm9q4YInx8',
        'secret': 'xV0raq2VZWGIgdtUpXKisz2ngX21Wl0JK390ZwA7iBQxt95Xv6dFHYEV5cTXMNVa',
      })
    const balance = await exchange.fetchBalance();
    return res.status(200).json(balance);

  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).end(error.message);
  }
}

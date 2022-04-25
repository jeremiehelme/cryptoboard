import { Currency } from 'model/Currency'

export default async function portfolio(req, res) {
    try {
        
        var ccxt = require('ccxt')
        const exchangeId = 'binance',
            exchangeClass = ccxt[exchangeId],
            exchange = new exchangeClass({
                apiKey:
                    'iinH3WV4oo0kDql4wQe6rHZ73OkYTt8SG9s51ILdAUtPXYfwaWfOegnm9q4YInx8',
                secret:
                    'xV0raq2VZWGIgdtUpXKisz2ngX21Wl0JK390ZwA7iBQxt95Xv6dFHYEV5cTXMNVa',
            })

        await exchange.loadMarkets()

        let tickers
        if (exchange.has['fetchTicker']) {
            tickers = await exchange.fetchTickers()
        }

        const balance = await exchange.fetchBalance()
        const total = balance.total

        let currencies = []

        Object.keys(total)
            .filter(currency => total[currency] != 0)
            .forEach(name => {
                let currency = new Currency(
                    name,
                    Math.round(total[name] * 10000) / 10000,
                    0,
                )

                if (Object.keys(tickers).includes(name + '/USDT')) {
                    currency.average = tickers[name + '/USDT'].average
                    currency.value =
                        Math.round(currency.total * currency.average * 1000) /
                        1000
                }
                currencies.push(currency)
            })
        currencies.sort((a, b) => (a.value > b.value ? -1 : 1))

        return res.status(200).json({ currencies, tickers })
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}

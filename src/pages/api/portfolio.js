import { Currency } from 'model/Currency'

export default async function portfolio(req, res) {
    try {
        if (Object.keys(req.query).length == 0) {
            return res.status(500).end('no exchanges')
        }

        var ccxt = require('ccxt')

        const exchangeData = JSON.parse(req.query[0])

        const exchangeId = exchangeData.exchange_id,
            exchangeClass = ccxt[exchangeId],
            exchange = new exchangeClass({
                apiKey: exchangeData.api_key,
                secret: exchangeData.secret_key,
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

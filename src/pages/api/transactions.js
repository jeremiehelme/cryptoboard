import { Currency } from 'model/Currency'

export default async function transactions(req, res) {
    try {
        if (Object.keys(req.query).length == 0) {
            return res.status(500).end('no exchanges')
        }
        var ccxt = require('ccxt')

        const exchangeData = JSON.parse(req.query[0])
        const exchangeId = exchangeData.exchange_id,
            exchangeClass = ccxt[exchangeId],
            ex = new exchangeClass({
                apiKey: exchangeData.api_key,
                secret: exchangeData.secret_key,
            })

        await ex.loadMarkets()
        const orders = await ex.fetchOrders('ETC/USDT')

        return res.status(200).json({ orders })
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}

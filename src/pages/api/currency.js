import BACK_API from '@/lib/axios'

export default async function currency(req, res) {
    try {
        if (Object.keys(req.query).length == 0) {
            return res.status(500).end('no currency set')
        }

        const currencyDatas = JSON.parse(req.query[0])
        const currencyCreated = BACK_API.post('api/currency', {
            symbol: currencyDatas.name,
        })
        return res.status(200).json({ currencyCreated })
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}

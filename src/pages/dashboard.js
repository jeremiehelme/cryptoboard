import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Button from '@/components/Button'
import FRONT_API from 'axios'
import BACK_API from '@/lib/axios'
import { Component } from 'react'

import CurrencyTable from 'components/CurrencyTable'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            portfolios: null,
            funds: 0,
            invested: 0,
            gains: 0,
        }
    }

    componentDidMount() {
        this.loadPortfolio()
    }

    async loadPortfolio() {
        const portfolios = await BACK_API.get('api/portfolio').then(
            res => res.data,
        )
        if (portfolios.length > 0) {
            this.setState({ portfolios: portfolios })
        }
    }

    async syncTransactions() {
        const exchanges = await BACK_API.get('api/exchange').then(
            res => res.data,
        )
        if (exchanges.length > 0) {
            const orders = await FRONT_API.get('api/transactions', {
                params: exchanges,
            }).then(res => res.data.orders)
            if (orders.length > 0) {
                let count = 0
                orders.forEach(order => {
                    console.log(order)
                    let value =
                        order.info.side === 'SELL'
                            ? -order.filled
                            : order.filled
                    count += value
                })
                console.log(count)
            }
        }
    }

    render() {
        let portofliosItems = this.state.portfolios?.map((portfolio, i) => {
            return (
                <div key={'portfolio-' + i}>
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200 flex flex-row gap-x-5">
                            <div>
                                Invested value :{portfolio?.value_invested}$
                            </div>
                        </div>
                        <CurrencyTable
                            currencies={portfolio.currencies}
                            columns={[
                                {
                                    name: 'Name',
                                    selector: row => row.symbol,
                                    sortable: true,
                                },
                                {
                                    name: 'Quantity',
                                    selector: row => row.quantity,
                                    sortable: true,
                                },
                                {
                                    name: 'Daily average price',
                                    selector: row => row.average,
                                    sortable: true,
                                },
                                {
                                    name: 'Current value',
                                    selector: row => row.value,
                                    sortable: true,
                                },
                                {
                                    name: 'Value Invested',
                                    selector: row => row.invest,
                                    sortable: true,
                                },
                                {
                                    name: 'Gain',
                                    selector: row => row.gain,
                                    sortable: true,
                                },
                            ]}></CurrencyTable>
                    </div>
                </div>
            )
        })
        return (
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard
                    </h2>
                }>
                <Head>
                    <title>Laravel - Dashboard</title>
                </Head>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-y-5 mb-10">
                        <div>
                            <Button onClick={this.syncTransactions}>
                                Sync Transactions
                            </Button>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-y-5">
                        {portofliosItems}
                    </div>
                </div>
            </AppLayout>
        )
    }
}

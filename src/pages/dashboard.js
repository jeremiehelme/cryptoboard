import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
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
        this.loadData = this.loadData.bind(this)
    }

    componentDidMount() {
        //this.loadData()
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

    async loadData() {
        //get user exchanges
        let exchanges = await BACK_API.get('api/exchange').then(res => res.data)
        let data = await FRONT_API.get('api/portfolio', {
            params: exchanges,
        }).then(res => res.data)

        if (data && data.hasOwnProperty('currencies')) {
            let fund = 0
            let totalInvested = Object.keys(this.state.invests).reduce(
                (accumVariable, curValue) => {
                    return accumVariable + this.state.invests[curValue]
                },
                0,
            )

            data.currencies.forEach(currency => {
                currency.invest = this.state.invests.hasOwnProperty(
                    currency.name,
                )
                    ? this.state.invests[currency.name]
                    : 0
                currency.gain = Math.round(currency.value - currency.invest)
                fund += currency.value
            })

            fund = Math.round(fund * 100) / 100
            this.setState({
                currencies: data.currencies,
                funds: fund,
                invested: totalInvested,
                gains: Math.round(fund - totalInvested),
            })
        }
    }

    render() {
        let portofliosItems = this.state.portfolios?.map(portfolio => {
            console.log(portfolio)
            return (
                <>
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
                                    selector: row => row.total,
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
                </>
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
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-y-5">
                        {portofliosItems}
                    </div>
                </div>
            </AppLayout>
        )
    }
}

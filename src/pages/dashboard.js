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
            currencies: [],
            funds: 0,
            invested: 0,
            gains: 0,
            invests: {
                ETH: 835,
                EGLD: 192,
                ATOM: 150,
                BNB: 125,
                ENJ: 155,
                COTI: 100,
                KDA: 100,
                DYDX: 50,
                ERN: 50,
                NEAR: 50,
                SOL: 0,
            },
        }
        this.loadData = this.loadData.bind(this)
    }

    componentDidMount() {
        this.loadData()
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
                        <div className="bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200 flex flex-row gap-x-5">
                                <div>Current value : {this.state.funds}$</div>
                                <div>
                                    Invested value : {this.state.invested}$
                                </div>
                                <div>gains : {this.state.gains}$</div>
                            </div>
                        </div>
                        <div className="bg-white shadow-sm sm:rounded-lg">
                            <CurrencyTable
                                currencies={this.state.currencies}
                                columns={[
                                    {
                                        name: 'Name',
                                        selector: row => row.name,
                                        sortable: true,
                                    },
                                    {
                                        name: 'Quantity',
                                        selector: row => row.total,
                                        sortable: true,
                                    },
                                    {
                                        name: 'Average',
                                        selector: row => row.average,
                                        sortable: true,
                                    },
                                    {
                                        name: 'Value',
                                        selector: row => row.value,
                                        sortable: true,
                                    },
                                    {
                                        name: 'Invest',
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
                </div>
            </AppLayout>
        )
    }
}

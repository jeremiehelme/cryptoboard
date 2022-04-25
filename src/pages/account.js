import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import { Component } from 'react'
import Link from 'next/link'
import CryptoTable from 'components/CryptoTable'

export default class Account extends Component {
    constructor(props) {
        super(props)
        this.loadData = this.loadData.bind(this)
        this.state = {
            exchanges: [],
        }
    }

    componentDidMount() {
        this.loadData()
    }

    async loadData() {
        let data = await axios.get('api/exchange').then(res => res.data)
        this.setState({ exchanges: data })
    }

    render() {
        return (
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Account
                    </h2>
                }>
                <Head>
                    <title>Laravel - Account</title>
                </Head>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-y-5">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200 flex flex-row gap-x-5">
                                Portfolios
                            </div>
                            <div className="p-6 bg-white border-b border-gray-200 flex flex-row gap-x-5">
                                <CryptoTable
                                    data={this.state.exchanges}
                                    columns={[
                                        {
                                            name: 'ID',
                                            selector: row => row.id,
                                            sortable: true,
                                        },
                                        {
                                            name: 'Name',
                                            selector: row => row.name,
                                            sortable: true,
                                        },
                                        {
                                            name: 'API Key',
                                            selector: row => row.api_key,
                                            sortable: true,
                                        },
                                        {
                                            name: 'Created',
                                            selector: row => row.created_at,
                                            sortable: true,
                                        },
                                    ]}></CryptoTable>
                            </div>
                            <div className="p-6 bg-white border-b border-gray-200 flex flex-row justify-end gap-x-5">
                                <Link href="/add-portfolio">
                                    <button>Add a portfolio</button>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200 flex flex-row gap-x-5">
                                Connected Exchanges
                            </div>
                            <div className="p-6 bg-white border-b border-gray-200 flex flex-row gap-x-5">
                                <CryptoTable
                                    data={this.state.exchanges}
                                    columns={[
                                        {
                                            name: 'ID',
                                            selector: row => row.id,
                                            sortable: true,
                                        },
                                        {
                                            name: 'Name',
                                            selector: row => row.name,
                                            sortable: true,
                                        },
                                        {
                                            name: 'API Key',
                                            selector: row => row.api_key,
                                            sortable: true,
                                        },
                                        {
                                            name: 'Created',
                                            selector: row => row.created_at,
                                            sortable: true,
                                        },
                                    ]}></CryptoTable>
                            </div>
                            <div className="p-6 bg-white border-b border-gray-200 flex flex-row justify-end gap-x-5">
                                <Link href="/add-exchange">
                                    <button>Add Exchange</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        )
    }
}

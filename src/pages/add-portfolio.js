import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { MultiSelect } from 'react-multi-select-component'

import BACK_API from '@/lib/axios'

import { useState } from 'react'
import { useAuth } from '@/hooks/auth'

const addPortfolio = () => {
    const { user } = useAuth({ middleware: 'guest' })

    const [name, setName] = useState('')
    const [value_invested, setvalueInvested] = useState('')
    const [exchanges, setExchanges] = useState([])
    const [currencies, setCurrencies] = useState([])
    const [options, setOptions] = useState([])
    const [errors, setErrors] = useState([])
    const [selected, setSelected] = useState([])

    const submitForm = event => {
        event.preventDefault()

        BACK_API.post('/api/portfolio', {
            name,
            value_invested,
            user_id: user?.id,
        })
            .then(() => {
                console.log('ok')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    if (exchanges.length === 0) {
        BACK_API.get('/api/exchange')
            .then(data => {
                setExchanges(data.data)
                let tmpCurr = []
                data.data.map(exchange => {
                    tmpCurr = tmpCurr.concat(exchange.currencies)
                })
                let tmpOpt = []
                tmpCurr.map(currency => {
                    tmpOpt.push({
                        label: currency.symbol,
                        value: currency.symbol,
                    })
                })
                setCurrencies(tmpCurr)
                setOptions(tmpOpt)
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Portfolio
                </h2>
            }>
            <Head>
                <title>Laravel - Add Portfolio</title>
            </Head>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-y-5 pb-12">
                <div className="bg-white shadow-sm sm:rounded-lg p-12 mt-12">
                    <AuthValidationErrors className="mb-4" errors={errors} />

                    <form
                        onSubmit={submitForm}
                        className="flex flex-col gap-y-5">
                        {/* Name */}
                        <div>
                            <Label htmlFor="name">Portfolio Name</Label>

                            <Input
                                id="name"
                                type="text"
                                value={name}
                                className="block mt-1 w-full"
                                onChange={event => setName(event.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                        {/* Name */}
                        <div>
                            <Label htmlFor="value_invested">
                                Value invested
                            </Label>

                            <Input
                                id="name"
                                type="text"
                                value={value_invested}
                                className="block mt-1 w-full"
                                onChange={event =>
                                    setvalueInvested(event.target.value)
                                }
                                required
                                autoFocus
                            />
                        </div>
                        <div>
                            <MultiSelect
                                options={options}
                                value={selected}
                                onChange={setSelected}
                                labelledBy="Select"
                            />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <Link href="/dashboard">
                                <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                    Annuler
                                </a>
                            </Link>

                            <Button className="ml-4">Add portfolio</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}

export default addPortfolio

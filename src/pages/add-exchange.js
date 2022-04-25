import AuthCard from '@/components/AuthCard'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'

const addExchange = () => {
    const { addNewExchange } = useAuth()
    const { user } = useAuth({ middleware: 'guest' })

    const [name, setName] = useState('')
    const [exchange_id, setExchangeId] = useState('')
    const [api_key, setApiKey] = useState('')
    const [secret_key, setSecretKey] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = event => {
        event.preventDefault()
        addNewExchange({
            name,
            exchange_id,
            api_key,
            secret_key,
            user_id: user?.id,
            setErrors,
        })
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Exchange
                </h2>
            }>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>
            <AuthCard
                logo={
                    <Link href="/">
                        <a></a>
                    </Link>
                }>
                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />

                <form onSubmit={submitForm}>
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Exchange Name</Label>

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

                    {/* Exchange ID */}
                    <div className="mt-4">
                        <Label htmlFor="exchange_id">Exchange id</Label>

                        <Input
                            id="exchange_id"
                            type="text"
                            value={exchange_id}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setExchangeId(event.target.value)
                            }
                            required
                        />
                    </div>

                    {/* api_key */}
                    <div className="mt-4">
                        <Label htmlFor="password">Api key</Label>

                        <Input
                            id="api_key"
                            type="text"
                            value={api_key}
                            className="block mt-1 w-full"
                            onChange={event => setApiKey(event.target.value)}
                            required
                        />
                    </div>

                    {/* secret_key */}
                    <div className="mt-4">
                        <Label htmlFor="secret_key">Secret key</Label>

                        <Input
                            id="secret_key"
                            type="password"
                            value={secret_key}
                            className="block mt-1 w-full"
                            onChange={event => setSecretKey(event.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <Link href="/dashboard">
                            <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                Annuler
                            </a>
                        </Link>

                        <Button className="ml-4">Add exchange</Button>
                    </div>
                </form>
            </AuthCard>
        </AppLayout>
    )
}

export default addExchange

import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'


export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })


    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>

            <div className="relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0">
                <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    {user ? (
                        <Link href="/dashboard">
                            <a className="ml-4 text-sm text-gray-700 underline">
                                Dashboard
                            </a>
                        </Link>
                    ) : (
                        <>
                            <Link href="/login">
                                <a className="text-sm text-gray-700 underline">
                                    Login
                                </a>
                            </Link>

                            <Link href="/register">
                                <a className="ml-4 text-sm text-gray-700 underline">
                                    Register
                                </a>
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    {user ? <div>Dashboard</div> : <div>Not athenticated</div>}
                </div>
            </div>
        </>
    )
}

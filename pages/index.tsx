import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import axios from "axios";
import useSwr from 'swr'


const fetcher = url => axios.get(url).then(res => res.data)

export default function Home() {

  const { data, error } = useSwr('/api/binance', fetcher)


  if (error) return <div>Failed to load currencies</div>
  if (!data) return <div>Loading...</div>

  let currencies = [];
  Object.keys(data["total"]).filter(currency => data[currency].total !== 0).forEach((currency) => {
    currencies.push({ datas: data[currency], name: currency })
  })



  return (
    <div className={styles.container}>
      <Head>
        <title>CryptoBoard - Track your performance</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center gap-y-10 p-12">
        <h1 className="text-5xl font-bold underline">Crypto Board</h1>
        <ul>
          {currencies.map((currency) => (
            <li key={currency.name}>
              {currency.name} : {currency.datas.total}
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

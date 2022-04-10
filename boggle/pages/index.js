import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div >
      <Head>
        <title>Solve boggle</title>
        <meta name="description" content="Solve boggle quickly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <h1 className={"title centered"}>
         Solve a boggle board
        </h1>

      </main>

    </div>
  )
}

import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
      </Head>
      <div className="font-poppins bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 min-h-screen">
        <Component {...pageProps} />
      </div>
    </>
  )
}

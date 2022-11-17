import '../styles/globals.css'
import type { AppProps } from 'next/app'
import EthContextProvider from "../context/ethContext"

export default function App({ Component, pageProps }: AppProps) {
  return <EthContextProvider><Component {...pageProps} /></EthContextProvider>
}

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import EthContextProvider from "../context/ethContext"
import { ThemeProvider } from '@mui/material/styles';
import theme from "../styles/todTwoTheme"
export default function App({ Component, pageProps }: AppProps) {
  
  return <ThemeProvider theme={theme}><EthContextProvider><Component {...pageProps} /></EthContextProvider></ThemeProvider>
}

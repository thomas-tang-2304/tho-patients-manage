/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
import { useState } from 'react'
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {

  const [mockData, setMockData] = useState({})
  return <Component {...pageProps} dataHook={[mockData, setMockData]}/>;
}

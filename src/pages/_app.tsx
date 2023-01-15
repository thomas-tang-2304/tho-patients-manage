/* eslint-disable prettier/prettier */
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { useState } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [mockData, setMockData] = useState({})
  return <Component {...pageProps} dataHook={[mockData, setMockData]}/>;
}

/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Router from 'next/router'
import { useState, useEffect } from 'react';
import Loader from '@/utils/loader';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [mockData, setMockData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setIsLoading(true)
    });

    Router.events.on("routeChangeComplete", () => {
      setIsLoading(false)
    });

    Router.events.on("routeChangeError", () => {
      setIsLoading(false)
    });

  }, [Router])
  return (
    <>
      {isLoading && <Loader />}
      <Component {...pageProps} dataHook={[mockData, setMockData]} />;
    </>
  )
}

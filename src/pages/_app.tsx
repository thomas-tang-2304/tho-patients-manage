/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
import { useState } from 'react'
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [text, setText] = useState<string>("hello")
  return <Component {...pageProps} text={text} setText={setText} />;
}

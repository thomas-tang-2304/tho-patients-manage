/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import Head from 'next/head';
import Dashboard from '../components/Dashboard';
import { useEffect } from 'react'

export default function Home({ text, setText }: any) {

  return (
    <div className={`container mx-auto`}  >
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard />
    </div>
  );
}

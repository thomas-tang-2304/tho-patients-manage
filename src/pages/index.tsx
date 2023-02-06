/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import React, { useEffect } from 'react';
import Dashboard from '../components/Dashboard';

const cookies = new Cookies();

export default function Home({ dataHook }: { dataHook: any }) {
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (!cookies.get('account_token')) {
      router.push('/login');
    }
  }, []);
  return (
    <div className={`container mx-auto`}>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard dataHook={dataHook} />
    </div>
  );
}

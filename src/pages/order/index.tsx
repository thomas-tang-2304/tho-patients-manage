/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import Order from '@/components/Order/Order';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';

export default function Index() {
  const router: NextRouter = useRouter();

  useEffect(() => {
    router.asPath == '/order' ? router.push('/order?page=1') : null;
  }, []);

  return (
    <div className={`container`}>
      <Head>
        <title>Order Management</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Order
        page={router.asPath == '/order' ? 0 : router.query.page}
        filterBy={router.asPath == '/order' ? 0 : router.query.filter_by}
      />
    </div>
  );
}

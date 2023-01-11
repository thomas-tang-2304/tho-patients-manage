/* eslint-disable prettier/prettier */
import React from 'react';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import Review from '@/components/Product/Review';
import SideMenu from '@/components/SideMenu';

export default function Index() {
  const { asPath }: NextRouter = useRouter();
  return (
    <div className={`container  mx-auto`}>
      <Head>
        <title>Product Management</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`h-[100vh]`}>
        <div className={`flex gap-6 w-[100%`}>
          <SideMenu currentPath={asPath}/>
          <Review />
        </div>
      </div>
    </div>
  );
}

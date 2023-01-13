/* eslint-disable prettier/prettier */
import React from 'react';
import SideMenu from '@/components/SideMenu';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import Banner from '@/components/Settings/Banner';

export default function Index() {
  const { asPath }: NextRouter = useRouter();
  return (
    <div className={`container  mx-auto`}>
      <Head>
        <title>Banner</title>
        <meta name="description" content="Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`h-[100vh]`}>
        <div className={`flex gap-6 w-[100%`}>
          <SideMenu currentPath={asPath} />
          <Banner />
        </div>
      </div>
    </div>
  );
}

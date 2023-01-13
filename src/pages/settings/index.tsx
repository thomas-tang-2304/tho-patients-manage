/* eslint-disable prettier/prettier */
import React from 'react';
import SideMenu from '@/components/SideMenu';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import Settings from '@/components/Settings/Settings';

export default function settings() {
  const { asPath }: NextRouter = useRouter();
  return (
    <div className={`container  mx-auto`}>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`h-[100vh]`}>
        <div className={`flex gap-6 w-[100%`}>
          <SideMenu currentPath={asPath} />
          <Settings />
        </div>
      </div>
    </div>
  );
}
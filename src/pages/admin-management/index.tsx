/* eslint-disable prettier/prettier */
import React from 'react';
import SideMenu from '@/components/SideMenu';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';

export default function AdminManagement() {
  const { asPath }: NextRouter = useRouter();
  return (
    <div className={`container  mx-auto`}>
      <Head>
        <title>Admin Management</title>
        <meta name="description" content="Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`h-[100vh]`}>
        <SideMenu currentPath={asPath} />
      </div>
    </div>
  );
}

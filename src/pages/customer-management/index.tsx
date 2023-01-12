/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React from 'react';
import SideMenu from '@/components/SideMenu';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import CustomerManagement from '@/components/CustomerManagement/CustomerManagement';

export default function customerManagement() {
  const { asPath }: NextRouter = useRouter();
  return (
    <div className={`container  mx-auto`}>
      <Head>
        <title>Customer Management</title>
        <meta name="description" content="Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`h-[100vh]`}>
        <div>Side menu</div>
        <div className={`flex gap-6 w-[100%`}>
          <SideMenu currentPath={asPath} />
          <CustomerManagement />
        </div>
      </div>
    </div>
  );
}

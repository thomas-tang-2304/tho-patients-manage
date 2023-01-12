/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import Admin from '@/components/AdminManagement/AdminManagement';
import Head from 'next/head';
import SideMenu from '@/components/SideMenu';
import { NextRouter, useRouter } from 'next/router';

export default function Index() {
  const { asPath }: NextRouter = useRouter();


  return (
    <div className={`container  mx-auto`}>

      <Head>
        <title>Admin Management</title>
        <meta name="description" content="Products" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`h-[100vh]`}>
        <div>Side menu</div>
        <div className={`flex gap-6 w-[100%`}>
          <SideMenu currentPath={asPath} />
          <Admin />
        </div>
      </div>
    </div>
  );
}

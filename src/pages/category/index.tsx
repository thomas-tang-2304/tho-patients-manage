/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import SideMenu from '@/components/SideMenu';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Category from '@/components/Category/Category';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function category() {
  const { asPath }: NextRouter = useRouter();
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (!cookies.get('account_token')) {
      router.push('/login');
    }
  }, []);
  return (
    <div className={`container  mx-auto`}>
      <Head>
        <title>Category Management</title>
        <meta name="description" content="Category" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`h-[100vh]`}>
        <div className={`flex gap-6 w-[100%`}>
          <SideMenu currentPath={asPath} />
          <Category />
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import SideMenu from '@/components/SideMenu';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import Review from '@/components/Review/Review';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function review() {
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
        <title>Review</title>
        <meta name="description" content="Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`h-[100vh]`}>
        <div className={`flex gap-6 w-[100%`}>
          <SideMenu currentPath={asPath} />
          <Review />
        </div>
      </div>
    </div>
  );
}

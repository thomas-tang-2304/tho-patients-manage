/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import SideMenu from '@/components/SideMenu';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import Category from '@/components/Category/Category';

export default function category() {
  const { asPath }: NextRouter = useRouter();
  return (
    <div className={`container  mx-auto`}>
      <Head>
        <title>Category Management</title>
        <meta name="description" content="Category" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`h-[100vh]`}>
        <div>Side menu</div>
        <div className={`flex gap-6 w-[100%`}>
          <SideMenu currentPath={asPath} />
          <Category />
        </div>
      </div>
    </div>
  );
}

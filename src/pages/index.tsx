/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <div className={`container`}>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard />
    </div>
  );
}

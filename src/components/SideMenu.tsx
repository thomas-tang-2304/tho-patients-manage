/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import styles from '../styles/SideMenu.module.css';
import { NextRouter, useRouter } from 'next/router';
import {FiLogOut} from 'react-icons/fi';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
interface SideList {
  content: string,
  href: string,
  className: string
}

const linkClassName = "py-2 cursor-pointer"

export default function SideMenu({ currentPath }: { currentPath: string }) {


  const router: NextRouter = useRouter();

  const [list, setList]: [SideList[], any] = useState()

  useEffect(() => {

    setList([
      {
        content: "Dashboard",
        href: '/',
        className: "py-2 cursor-pointer"
      },
      {
        content: "Order",
        href: '/order',
        className: "py-2 cursor-pointer"
      },
      {
        content: "Product",
        href: '/product',
        className: "py-2 cursor-pointer"
      },
      {
        content: "Review",
        href: '/review',
        className: "py-2 cursor-pointer"
      },
      {
        content: "Category",
        href: '/category',
        className: "py-2 cursor-pointer"
      },
      {
        content: "Content",
        href: '/content',
        className: "py-2 cursor-pointer"
      },
      {
        content: "Admin management",
        href: '/admin-management',
        className: "py-2 cursor-pointer"
      },
      {
        content: "Customer management",
        href: '/customer-management',
        className: "py-2 cursor-pointer"
      },
      {
        content: "Settings",
        href: '/settings',
        className: "py-2 cursor-pointer"
      },
    ].map((li: SideList) => li.href === (currentPath ?? "/") ? { ...li, className: "py-2 text-red-600 cursor-pointer" } : li));
  }, [])

  return (
    <div className={`w-1/4 border-gray-200 border-2  flex flex-col justify-between`}>
      <div className={`p-4`}>
        <div className={`${styles.logo} ml-2 w-fit `}>
          <h1 className={`py-5 px-[50px] shadow-md`}>Logo Calobye</h1>
        </div>
        <ul className="py-3 ml-2">
          {list?.map((li: SideList, i: number) =>

            <li key={i} className={li.className} onClick={() => router.push(li?.href)}>
              <a>{li?.content}</a>
            </li>
          )}

        </ul>
      </div>
      <div onClick={() => {
        cookies.remove('account_token')
        router.push('./login')
      }} className={`${styles.logout}`}>
        <p>Logout</p>
        <FiLogOut className={`${styles.icon} mt-1.5`}/>
      </div>
    </div>
  );
}

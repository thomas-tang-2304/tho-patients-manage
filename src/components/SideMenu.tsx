/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable prettier/prettier */

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from '../styles/SideMenu.module.css';
import { NextRouter, useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi';
import Cookies from 'universal-cookie';
import { GoDashboard, GoGift } from 'react-icons/go';
import {
  MdOutlineContentPaste,
  MdOutlineAdminPanelSettings,
  MdOutlineSettings,
} from 'react-icons/md';
import {TiMessages} from 'react-icons/ti';
import {CiPillsBottle1} from 'react-icons/ci';

const cookies = new Cookies();
interface SideList {
  content: string;
  href: string;
  className: string;
}

const linkClassName = 'py-2 cursor-pointer px-4 text-md text-white';
const activeLinkClassName = `py-2 cursor-pointer px-4 text-black font-bold text-2xl bg-white px-4 rounded`;

export default function SideMenu({ currentPath }: { currentPath: string }) {
  const router: NextRouter = useRouter();

  const [list, setList]:
    | [SideList[] | undefined, Dispatch<SetStateAction<SideList[] | undefined>>]
    | any[] = useState(
    [
      {
        icon: <GoDashboard />,
        content: 'Dashboard',
        href: '/',
        className: linkClassName,
      },
      {
        icon: <CiPillsBottle1 />,
        content: 'Disease prediction',
        href: '/disease-prediction',
        className: linkClassName,
      },
      {
        icon: <MdOutlineContentPaste />,
        content: 'Patient history',
        href: '/patient-history',
        className: linkClassName,
      },
      {
        icon: <MdOutlineAdminPanelSettings />,
        content: 'Admin management',
        href: '/admin-management',
        className: linkClassName,
      },
      {
        icon: <TiMessages />,
        content: 'Support',
        href: '/support',
        className: linkClassName,
      },
      {
        icon: <MdOutlineSettings />,
        content: 'Settings',
        href: '/settings',
        className: linkClassName,
      },
    ].map((li: SideList) =>
      li.href === (currentPath ?? '/')
        ? { ...li, className: activeLinkClassName }
        : li,
    ),
  );

  useEffect(() => {
    setList((prev: SetStateAction<SideList[] | undefined>) =>
      prev?.map((li: SideList) =>
        li.href === (currentPath ?? '/')
          ? { ...li, className: activeLinkClassName }
          : li,
      ),
    );
  }, []);

  console.log(list)

  return (
    <div
      className={`w-1/4 ${styles['side-menu']} flex flex-col justify-between `}
    >
      <div className={`p-4`}>
        <div className={`${styles.logo} ml-2 w-fit rounded`}>
          <h1 className={`py-5 px-[50px] font-bold shadow-xl`}>Bệnh Viện Thỏ 7 Màu</h1>
        </div>
        <div className="flex flex-col justify-between">
          <ul className="py-3 ml-2">
            {list?.map((li: SideList, i: number) => (
              <li
                key={i}
                className={`${li.className} flex items-center gap-2 `}
                onClick={() => router.push(li?.href)}
              >
                <span>{li?.icon}</span>
                <a className="line-clamp-1">{li?.content}</a>
              </li>
            ))}
            <li
              onClick={() => {
                cookies.remove('account_token');
                router.push('./login');
              }}
              className={`${styles.logout} text-white text-xl`}
            >
              <p>Logout</p>
              <FiLogOut className={`${styles.icon} mt-1.5`} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

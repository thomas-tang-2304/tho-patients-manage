/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable prettier/prettier */

import React from 'react'
import styles from '../styles/SideMenu.module.css'
import { NextRouter, useRouter } from 'next/router'

export default function SideMenu() {
    const router: NextRouter = useRouter()
    return <div className={`w-1/4 border-gray-200 border-2 `}>

        <div className={`p-4 `
        }>
            <div className={`${styles.logo} ml-2 w-fit `}><p className={`py-5 px-[50px] shadow-md`}>Logo Calobye</p></div>
            <ul className='py-3 ml-2'>
                <li className='py-2 cursor-pointer' onClick={() => router.push('/')}>
                    <a>Dashboard</a>
                </li>
                <li className='py-2 cursor-pointer' onClick={() => router.push('/order')}>
                    <a >Order</a>
                </li>
                <li className='py-2 cursor-pointer' onClick={() => router.push('/products')}>
                    <a >Product</a>
                </li>
                <li className='py-2 cursor-pointer' onClick={() => router.push('/review')}>
                    <a >Review</a>
                </li>
                <li className='py-2 cursor-pointer' onClick={() => router.push("/category")}>
                    <a >Category</a>
                </li>
                <li className='py-2 cursor-pointer' onClick={() => router.push("/content")}>
                    <a >Content</a>
                </li>
                <li className='py-2 cursor-pointer' onClick={() => router.push("/admin-management")}>
                    <a >Admin management</a>
                </li>
                <li className='py-2 cursor-pointer' onClick={() => router.push("/customer-management")}>
                    <a >Customer management</a>
                </li>
                <li className='py-2 cursor-pointer' onClick={() => router.push("/settings")}>
                    <a>Settings</a>
                </li>
            </ul>
        </div >

    </div>

}



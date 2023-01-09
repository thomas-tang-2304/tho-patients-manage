/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */


import Login from '../components/Login'
import SideMenu from '@/components/SideMenu'


import React, { useEffect, useState } from 'react'
import SideMenu from '@/components/SideMenu'
import axios from 'axios';


export default function Dashboard() {
    const totalClass: string = `text-2xl bg- w-2/3 border-2 pt-2 px-3 text-orange-500 pb-4 pt-5`
    const [statistic, setStatistic] = useState({ total_customer: 0, total_order: 0, total_product: 0, total_sales: 0 });

    useEffect(() => {

        const getStatistic = async () => {

            await axios.get('https://dev-api.digiex.asia/calobye-be-dev/api/dashboard/statistics', {
                headers: {
                    'accept': '*/*',
                    'Auth-Token': '02d0a36b3dc4436d9cda4d072382c73f'
                }
            }).then((res) => {
                const { total_customer, total_order, total_product, total_sales } = res?.data?.data
                setStatistic({ total_customer, total_order, total_product, total_sales });
            });

        }

        getStatistic()
    }, [])

    return (<div className={`h-[100vh]`}>
        <div>Side menu</div>
        <div className={`flex h-inherit gap-6`}>
            <SideMenu />
            <div className={`border-gray-200 border-2 p-4 w-3/4 `
            }>
                <div className={`ml-2 text-3xl w-fit pb-5 mb-5`}>
                    <p className={`font-bold`}>Sale statistic</p>
                </div>
                <div className='grid grid-flow-col grid-rows-2 gap-4 py-3 ml-2'>
                    <span className={totalClass}>
                        Total order: {statistic?.total_order}
                    </span>
                    <span className={totalClass}>
                        Total customer: {statistic?.total_customer}
                    </span>
                    <span className={totalClass}>
                        Total products: {statistic?.total_product}
                    </span>
                    <span className={totalClass}>
                        Total sales: {statistic?.total_sales?.toLocaleString('vi', { style: 'currency', currency: 'VND' }).replace('₫', 'vnd')}
                    </span>
                </div>
            </div >
        </div>
    </div>

    )
}

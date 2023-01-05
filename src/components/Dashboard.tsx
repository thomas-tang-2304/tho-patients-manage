/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */


import React from 'react'
import SideMenu from '@/components/SideMenu'

export default function Dashboard() {
    const totalClass: string = `text-2xl bg- w-2/3 border-2 pt-2 px-3 text-orange-500 pb-4 pt-5`



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
                        Total order: 100
                    </span>
                    <span className={totalClass}>
                        Total customer: 50
                    </span>
                    <span className={totalClass}>
                        Total products: 100
                    </span>
                    <span className={totalClass}>
                        Total sales: 50.000.0000 vnd
                    </span>
                </div>
            </div >
        </div>
    </div>

    )
}

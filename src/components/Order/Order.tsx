/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */


import React, { MutableRefObject, ReactNode, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

import SideMenu from '@/components/SideMenu'
import BasicTable from '@/utils/UIs/Table'
import axios from 'axios'
import PaginatedItems from '@/utils/UIs/ReactPagination'
import { NextRouter, useRouter } from 'next/router'


export default function Order({ page, filterBy }: any) {

    // curl - X 'GET' \
    // 'https://dev-api.digiex.asia/calobye-be-dev/api/orders/page?page_number=1&page_size=10&asc_sort=false' \
    // -H 'accept: */*' \
    // -H 'Auth-Token: 02d0a36b3dc4436d9cda4d072382c73f'

    const router: any = useRouter()
    const filterByStatus: MutableRefObject<any> = useRef()

    const token = '02d0a36b3dc4436d9cda4d072382c73f';
    const [pageNumber, setPageNumber] = useState(0)
    const [callApiPending, setCallApiPending] = useState(false)
    const [instance, setInstance]: any = useState([])
    const [orderLength, setOrderLength] = useState(0)
    const offsets = {
        size: 10
    }

    const tableHeader = [
        "OrderCode",
        "Fullname",
        "Total",
        "Create date",
        "Status",
    ]

    function createData(
        code: string,
        full_name: string,
        total: number,
        create_date: ReactNode,
        status: string,
    ) {
        return {
            code,
            full_name,
            total,
            create_date,
            status,
        };
    }

    async function fetchMyAPI(p = 1, filter_status = "") {

        setCallApiPending(true)

        return await axios.get('https://dev-api.digiex.asia/calobye-be-dev/api/orders/page', {
            params: {
                'page_size': offsets.size + "",
                'page_number': p,
                'asc_sort': 'false',
                'order_status': filter_status == "Choose Status" ? undefined : filter_status
            },
            headers: {
                'accept': '*/*',
                'Auth-Token': token
            }
        }).then((data: any) => {

            setCallApiPending(false)
            setPageNumber(p)
            setOrderLength(data?.data?.data?.total_elements)
            setInstance(data?.data?.data?.content?.map((item: any) => createData(
                item.order_code,
                `${item.first_name} ${item.last_name ?? ""}`,
                item.total_price,
                item.created_date,
                item.order_status,

            )))
        }).catch((err) => {
            setCallApiPending(false)
            console.log(err);
        })

    }

    useLayoutEffect(() => {
        setInstance([])


        if (page) {
            if (filterBy) {
                filterByStatus.current.value = filterBy
                fetchMyAPI(page, filterBy)
            }
            else { filterByStatus.current.value = "Choose Status"; fetchMyAPI(page, "") }
        }
    }, [page, filterBy])

    const filterByValue = (e: any = "PAID") => {
        setInstance([])

        const value = e.target.value
        router.push(
            {
                pathname: '/order'
                ,
                query: {
                    page: 1,
                    filter_by: value
                }
            })



        fetchMyAPI(1, value)

    }

    return (<>
        <div className={`h-[100vh]`}>
            <div>Side menu</div>
            <div className={`flex h-inherit gap-6`}>
                <SideMenu />
                <div className={`border-gray-200 border-2 p-4 w-3/4 `
                }>
                    <div className={`ml-2 text-3xl w-fit  `}>
                        <p className={`font-bold`}>Order Management</p>
                    </div>
                    <form action="" className='flex items-center justify-between'>
                        <div className="flex items-center border-2 w-52 input-icons">

                            <span className='icon'><BsSearch /></span>
                            <input className="input-field" type="text" placeholder='Search order code' />
                        </div>
                        <div className="">

                            <div><label htmlFor="cars" className={`font-bold text-xl`}>Filter status</label></div>

                            <div className={`text-center`}>
                                <select name="order-state" id="order-selector" ref={filterByStatus} className={`border-2 px-3 py-2 capitalize`} onChange={(e: any) => filterByValue(e)}>
                                    <option disabled selected hidden defaultValue="all">Choose Status</option>
                                    <option className='capitalize' value="PAID">paid</option>
                                    <option className='capitalize' value="PENDING">pending</option>
                                    <option className='capitalize' value="DELIVERED">delivered</option>
                                    <option className='capitalize' value="DELIVERING">delivering</option>
                                    <option className='capitalize' value="REVIEWED">reviewed</option>
                                    <option className='capitalize' value="CANCELLED">cancelled</option>
                                    <option className='capitalize' value="CONFIRMED">confirmed</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className={`table-container py-4`}>
                        <BasicTable
                            itemsPerPage={offsets.size}
                            rows={instance}
                            headers={tableHeader}
                            callApiPending={callApiPending}
                        />
                    </div>

                    <div className={`paginator-container`}>
                        <PaginatedItems itemsPerPage={offsets.size} items={orderLength} page={pageNumber} router={router} />
                    </div>
                </div >

            </div>
        </div>
    </>
    )
}

function Paginator(arg0: { page: number }) {
    throw new Error('Function not implemented.')
}

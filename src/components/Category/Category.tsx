/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */

import React, {
  MutableRefObject,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { BsSearch } from 'react-icons/bs';

import BasicTable from '@/utils/UIs/Table';
import axios from 'axios';
import PaginatedItems from '@/utils/UIs/ReactPagination';
import { useRouter, NextRouter } from 'next/router';

import Cookies from 'universal-cookie';
import { Button } from '@mui/material';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import ViewIcon from '@/utils/UIs/ViewIcon';

const cookies = new Cookies();

export default function Category() {
  // curl - X 'GET' \
  // 'https://dev-api.digiex.asia/calobye-be-dev/api/orders/page?page_number=1&page_size=10&asc_sort=false' \
  // -H 'accept: */*' \
  // -H 'Auth-Token: 02d0a36b3dc4436d9cda4d072382c73f'

  const filterByStatus: MutableRefObject<string | undefined | any> = useRef();
  const router: NextRouter = useRouter();

  const [token, setToken] = useState(cookies.get('account_token'));
  const [pageNumber, setPageNumber]: any = useState(router.query.page);
  const [callApiPending, setCallApiPending] = useState(false);
  const [instance, setInstance]: any = useState([]);
  const [categoryLength, setCategoryLength] = useState(0);

  const offsets = {
    size: 10,
  };

  const tableHeader = ['Name', 'Created date', 'Status', 'Action'];

  function createData(name: string, create_date: ReactNode, status: string) {
    return [
      {
        type: 'text',
        content: name,
      },
      create_date,
      status,
      <ViewIcon />,
    ];
  }

  async function fetchMyAPI(p: number | string | string[]) {
    setInstance([]);
    setCallApiPending(true);

    return await axios
      .get('https://dev-api.digiex.asia/calobye-be-dev/api/category/page', {
        params: {
          asc_sort: 'false',
          page_number: p,
          page_size: offsets.size,
          Language_type: 'VN',
        },
        headers: {
          accept: '*/*',
          'Auth-Token': token,
        },
      })
      .then((data: any) => {
        setPageNumber(p);
        setCategoryLength(data?.data?.data?.total_elements);

        setInstance(
          data?.data?.data?.content?.map((item: any) =>
            createData(item.name, item.created_date, item.status),
          ),
        );
      })
      .catch((err) => {
        setCategoryLength(0);
        setInstance([]);
        console.log(err);
      })
      .finally(() => {
        setCallApiPending(false);
      });
  }

  const getCategoryRows = () => {
    if (router.query.page) {
      fetchMyAPI(router.query.page);
    } else {
      fetchMyAPI(1);
    }
  };

  useLayoutEffect(() => {
    setInstance([]);
    getCategoryRows();
  }, [router.query.page, router.query.filter_by]);

  // const filterByOrderCode = () => {
  //     setCallApiPending(true);

  //     const call = async () => {
  //         return await axios.get(`https://dev-api.digiex.asia/calobye-be-dev/api/orders/${OrderCodeInput.current.value}`, {
  //             headers: {
  //                 'accept': '*/*',
  //                 'Auth-Token': token
  //             }
  //         })
  //             .then((res: any) => {
  //                 const { data } = res
  //                 setOrderLength(1);
  //                 setInstance(
  //                     [
  //                         createData(
  //                             data.data.order_code,
  //                             `${data.data.customer.first_name} ${data.data.customer.last_name}`,
  //                             data.data.total_price,
  //                             data.data.created_date,
  //                             data.data.status
  //                         )
  //                     ]
  //                 );

  //             })
  //             .catch((err) => {
  //                 setOrderLength(0);
  //                 setInstance([]);
  //                 console.log(err);
  //             }).finally(() => {
  //                 setCallApiPending(false);

  //             });
  //     }

  //     if (OrderCodeInput.current.value != "") call();

  //     else {
  //         getOrderRows();
  //     }
  // }

  return (
    <>
      <div className={`border-gray-200 border-2 p-4 w-3/4 `}>
        <div className={`ml-2 text-3xl w-fit  `}>
          <h1 className={`font-bold`}>Category Management</h1>
        </div>
        <form action="" className="flex items-center justify-between">
          <div className="flex items-center border-2 w-52 input-icons">
            <span className="text-2xl cursor-pointer icon hover:text-teal-600">
              <BsSearch />
            </span>
            <input
              className="input-field"
              type="text"
              placeholder="Search order code"
            />
          </div>
          <div className="">
            <Button variant="outlined" className={`hover:bg-indigo-700 rounded bg-indigo-500 text-white p-2 px-3 cursor-pointer text-center`}>+ Add Category</Button>
          </div>
        </form>
        <div className={`table-container py-4`}>
          <BasicTable
            itemsPerPage={offsets.size}
            rows={instance}
            headers={tableHeader}
            callApiPending={callApiPending}
            component={'order'}
          />
        </div>

        <div className={`paginator-container`}>
          {pageNumber && (
            <PaginatedItems
              itemsPerPage={offsets.size}
              items={categoryLength}
              router={router}
              currentPath={'/category'}
            />
          )}
        </div>
      </div>
    </>
  );
}

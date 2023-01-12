/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

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
import { NextRouter, useRouter } from 'next/router';

import Cookies from 'universal-cookie';
import { Button } from '@mui/material';
import ViewIcon from '@/utils/UIs/ViewIcon';

const cookies = new Cookies();

export default function CustomerManagement() {
  const router: NextRouter = useRouter();
  const SeachCustomerInput: MutableRefObject<string | undefined | any> =
    useRef();

  const [token, setToken] = useState(cookies.get('account_token'));
  const [pageNumber, setPageNumber]: any = useState(router.query.page);
  const [callApiPending, setCallApiPending] = useState(false);
  const [instance, setInstance]: any = useState([]);
  const [customerLength, setCustomerLength] = useState(0);

  const offsets = {
    size: 10,
  };

  const tableHeader = ['User Email', 'Fullname', 'Status', 'Action'];

  function createData(
    usermail: string,
    fullname: string,

    status: string,
  ) {
    return [
      {
        type: 'text',
        content: usermail,
      },
      fullname,
      status,
      <ViewIcon />,
    ];
  }

  async function fetchMyAPI(p: number | string | string[]) {
    setCallApiPending(true);

    await axios
      .get('https://dev-api.digiex.asia/calobye-be-dev/api/customer', {
        params: {
          page_number: p,
          page_size: offsets.size,
          asc_sort: 'false',
        },
        headers: {
          accept: '*/*',
          'Auth-Token': token,
        },
      })
      .then((data: any) => {
        setPageNumber(p);
        setCustomerLength(data?.data?.data?.total_elements);
        setInstance(
          data?.data?.data?.content?.map((item: any) =>
            createData(
              item.email,
              `${item.first_name ?? ''} ${item.last_name ?? ''}`,
              item.is_receive_promotion ? 'ACTIVE' : 'INACTIVE',
            ),
          ),
        );
        console.log(data);
      })
      .catch((err) => {
        setCustomerLength(0);
        setInstance([]);
        console.log(err);
      })
      .finally(() => {
        setCallApiPending(false);
      });
  }

  const searchCustomer = () => {
    setCallApiPending(true);

    const call = async () => {
      return await axios
        .get(
          `https://dev-api.digiex.asia/calobye-be-dev/api/customer/${SeachCustomerInput.current.value}`,
          {
            headers: {
              accept: '*/*',
              'Auth-Token': token,
            },
          },
        )
        .then((res: any) => {
          const { data } = res;
          setCustomerLength(1);
          setInstance([
            createData(
              data.data.email,
              `${data.data.first_name ?? ''} ${data.data.last_name ?? ''}`,
              data.data.is_receive_promotion ? 'ACTIVE' : 'INACTIVE',
            ),
          ]);
          console.log(data);
        })
        .catch((err) => {
          setCustomerLength(0);
          setInstance([]);
          console.log(err);
        })
        .finally(() => {
          setCallApiPending(false);
        });
    };
    if (SeachCustomerInput.current.value != '') call();
    else {
      if (router.query.page) fetchMyAPI(router.query.page);
      else fetchMyAPI(1);
    }
  };

  useLayoutEffect(() => {
    setInstance([]);

    if (router.query.page) fetchMyAPI(router.query.page);
    else fetchMyAPI(1);
  }, [router.query.page, router.query.filter]);

  return (
    <>
      <div className={`border-gray-200 border-2 p-4 w-3/4 `}>
        <div className={`ml-2 text-3xl w-fit`}>
          <h1 className={`font-bold`}>Customer Management</h1>
        </div>
        <form action="" className="flex items-center justify-between">
          <div className="flex items-center border-2 w-60 first-letter:input-icons">
            <span className="icon" onClick={searchCustomer}>
              <BsSearch />
            </span>
            <input
              className="input-field"
              type="text"
              placeholder="Search Product"
              ref={SeachCustomerInput}
            />
          </div>
          <div className="">
            <Button variant="outlined">+ Add customer</Button>
          </div>
        </form>
        <div className={`table-container py-4`}>
          <BasicTable
            itemsPerPage={offsets.size}
            rows={instance}
            headers={tableHeader}
            callApiPending={callApiPending}
            component={'customer-management'}
          />
        </div>

        <div className={`paginator-container`}>
          {pageNumber && (
            <PaginatedItems
              itemsPerPage={offsets.size}
              items={customerLength}
              router={router}
              currentPath={'/customer-management'}
            />
          )}
        </div>
      </div>
    </>
  );
}

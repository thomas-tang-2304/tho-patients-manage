/* eslint-disable prettier/prettier */

import React, { useLayoutEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'universal-cookie';
import AddAdmin from './AddAdmin';
import Modal from '@/utils/UIs/Modal';
import BasicTable from '@/utils/UIs/Table';
import ViewIcon from '@/utils/UIs/ViewIcon';
import PaginatedItems from '@/utils/UIs/ReactPagination';

const cookies = new Cookies();
export default function AdminManagement() {
  const router: any = useRouter();
  const source = axios.CancelToken.source();

  const [token, setToken] = useState(cookies.get(`account_token`));
  const [pageNumber, setPageNumber] = useState(0);
  const [callApiPending, setCallApiPending] = useState(false);
  const [instance, setInstance]: any = useState([]);
  const [productsLength, setProductsLength] = useState(0);

  const offsets = {
    size: 10,
  };

  const tableHeader = [`Email`, `Fullname`, `Status`, `Action`];

  function createData(email: string, fullname: string, status: string) {
    return [
      {
        content: email,
      },
      fullname,
      status,
      <ViewIcon key={1} />,
    ] as any;
  }

  async function fetchMyAPI(p = 1) {
    setCallApiPending(true);

    return await axios
      .get(`https://dev-api.digiex.asia/calobye-be-dev/api/admin`, {
        params: {
          page_number: p,
          size_number: offsets.size,
          asc_sort: `false`,
        },
        headers: {
          accept: `*/*`,
          'Auth-Token': token,
        },
        cancelToken: source.token,
      })
      .then((data: any) => {
        setPageNumber(p);
        setProductsLength(data?.data?.data?.total_elements);
        setInstance(
          data?.data?.data?.content?.map((item: any) =>
            createData(
              item.email,
              `${item.first_name ?? ``} ${item.last_name ?? ``}`,
              item.status,
            ),
          ),
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setCallApiPending(false);
      });
  }

  useLayoutEffect(() => {
    setInstance([]);

    if (router.query.page) fetchMyAPI(router.query.page);
    else {
      fetchMyAPI(1);
    }

    return () => {
      source.cancel(`Cancelling in cleanup`);
    };
  }, [router.query]);

  return (
    <>
      <div className={`p-4 w-3/4 `}>
        <div className={`ml-2 text-3xl w-fit  `}>
          <h1 className={`font-bold mb-3 text-black`}>Admin Management</h1>
        </div>
        <form action="" className="flex items-center justify-between">
          <div className="flex items-center border-2 w-52 input-icons">
            <span className="icon">
              <BsSearch />
            </span>
            <input
              className="input-field"
              type="text"
              placeholder="Search order code"
            />
          </div>
          <Modal component={<AddAdmin />} action_name="+ Add Admin" saveClick='save'/>
        </form>
        <div className={`table-container py-4`}>
          <BasicTable
            itemsPerPage={offsets.size}
            rows={instance}
            headers={tableHeader}
            callApiPending={callApiPending}
            component={`admin-management`}
          />
        </div>

        <div className={`paginator-container`}>
          <PaginatedItems
            itemsPerPage={offsets.size}
            items={productsLength}
            page={pageNumber}
            router={router}
            currentPath={`/admin-management`}
          />
        </div>
      </div>
    </>
  );
}

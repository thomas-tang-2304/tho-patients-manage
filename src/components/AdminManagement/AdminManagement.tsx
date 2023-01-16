/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
import React, { useLayoutEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import BasicTable from '@/utils/UIs/Table';
import axios from 'axios';
import PaginatedItems from '@/utils/UIs/ReactPagination';
import { useRouter } from 'next/router';
import ViewIcon from '@/utils/UIs/ViewIcon';
import Modal from '@/utils/UIs/Modal';
import Cookies from 'universal-cookie';
import AddAdmin from './AddAdmin';

const cookies = new Cookies();
export default function AdminManagement() {
  // curl - X 'GET' \
  // 'https://dev-api.digiex.asia/calobye-be-dev/api/orders/page?page_number=1&page_size=10&asc_sort=false' \
  // -H 'accept: */*' \
  // -H 'Auth-Token: 02d0a36b3dc4436d9cda4d072382c73f'

  const router: any = useRouter();
  const source = axios.CancelToken.source();

  const [token, setToken] = useState(cookies.get('account_token'));
  const [pageNumber, setPageNumber] = useState(0);
  const [callApiPending, setCallApiPending] = useState(false);
  const [instance, setInstance]: any = useState([]);
  const [productsLength, setProductsLength] = useState(0);

  // const re = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

  const offsets = {
    size: 10,
  };

  const tableHeader = ['Email', 'Fullname', 'Status', 'Action'];

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
      .get('https://dev-api.digiex.asia/calobye-be-dev/api/admin', {
        params: {
          page_number: p,
          size_number: offsets.size,
          asc_sort: 'false',
        },
        headers: {
          accept: '*/*',
          'Auth-Token': token,
        },
        cancelToken: source.token
      })
      .then((data: any) => {
        setPageNumber(p);
        setProductsLength(data?.data?.data?.total_elements);
        setInstance(
          data?.data?.data?.content?.map((item: any) =>
            createData(
              item.email,
              `${item.first_name ?? ''} ${item.last_name ?? ''}`,
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


    if (router.query.page)
      fetchMyAPI(router.query.page);
    else {
      fetchMyAPI(1);
    }

    return () => { source.cancel("Cancelling in cleanup"); }
  }, [router.query]);



  return (
    <>
      <div className={`p-4 w-3/4 `}>
        <div className={`ml-2 text-3xl w-fit  `}>
          <h1 className={`font-bold mb-3`}>Admin Management</h1>
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
          <Modal component={<AddAdmin />} action_name="+ Add Admin" />
        </form>
        <div className={`table-container py-4`}>
          <BasicTable
            itemsPerPage={offsets.size}
            rows={instance}
            headers={tableHeader}
            callApiPending={callApiPending}
            component={'admin-management'}
          />
        </div>


        <div className={`paginator-container`}>
          <PaginatedItems
            itemsPerPage={offsets.size}
            items={productsLength}
            page={pageNumber}
            router={router}
            currentPath={'/admin-management'}
          />
        </div>

      </div>
    </>
  );
}

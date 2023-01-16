/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */

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
import ViewIcon from '@/utils/UIs/ViewIcon';
import Modal from '@/utils/UIs/Modal';
import AddCategory from './AddCategory';

const cookies = new Cookies();

export default function Category() {
  const router: NextRouter = useRouter();
  const source: any = axios.CancelToken.source();

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
      <ViewIcon key={1} />,
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
        cancelToken: source.token,
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
    return () => {
      source.cancel('Cancelling in cleanup');
    };
  }, [router.query]);

  return (
    <>
      <div className={`p-4 w-3/4 `}>
        <div className={`ml-2 text-3xl w-fit  `}>
          <h1 className={`font-bold mb-3`}>Category Management</h1>
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
            <Modal component={<AddCategory />} action_name="+ Add category" />
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
